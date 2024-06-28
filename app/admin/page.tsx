'use client';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../db/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import './adminpage.css';

interface UserData {
  id: string;
  name: string;
}

interface Payment {
  bulan: string;
  date: string;
  fileName: string;
  filePath: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchPayments();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'Users');
      const querySnapshot = await getDocs(usersRef);
      const usersData: UserData[] = [];

      querySnapshot.forEach((doc) => {
        const userData: UserData = {
          id: doc.data().id,
          name: doc.data().name,
        };
        usersData.push(userData);
      });

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const paymentsRef = collection(db, 'Payments');
      const querySnapshot = await getDocs(paymentsRef);
      const paymentsData: Payment[] = [];

      querySnapshot.forEach((doc) => {
        const paymentData: Payment = {
          bulan: doc.data().bulan,
          date: doc.data().date,
          fileName: doc.data().file_name,
          filePath: doc.data().file_path,
        };
        paymentsData.push(paymentData);
      });

      setPayments(paymentsData);
    } catch (error) {
      console.error('Error fetching payments: ', error);
    }
  };

  const handleValidatePayment = async (fileName: string) => {
    try {
      const paymentRef = doc(db, 'Payments', fileName);
      await deleteDoc(paymentRef);

      const storageRef = ref(storage, `payments/${fileName}`);
      await deleteObject(storageRef);

      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.fileName !== fileName)
      );

      alert('Pembayaran telah divalidasi dan file telah dihapus.');
    } catch (error) {
      console.error('Error validating payment: ', error);
    }
  };

  return (
    <div>
      <h1>Halaman Admin</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID Pengguna</th>
              <th>Nama Pengguna</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Daftar Pembayaran</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Bulan</th>
              <th>Tanggal</th>
              <th>Nama Pengguna</th>
              <th>File</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.bulan}</td>
                <td>{payment.date}</td>
                <td>
                  <a href={payment.filePath} target="_blank" rel="noopener noreferrer">
                    {payment.fileName}
                  </a>
                </td>
                <td>
                  <button onClick={() => handleValidatePayment(payment.fileName)}>
                    Validasi Pembayaran
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
