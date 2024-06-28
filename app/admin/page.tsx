'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db/firebase';

interface PaymentData {
  id: string;
  nama: string;
  bulan: string;
  tanggalBayar: string;
  dokumenUrl: string;
}

const AdminPage: React.FC = () => {
  const [data, setData] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from Firebase...');
        const querySnapshot = await getDocs(collection(db, 'payments'));
        const paymentsData: PaymentData[] = [];
        querySnapshot.forEach((doc) => {
          paymentsData.push({ id: doc.id, ...doc.data() } as PaymentData);
        });
        console.log('Data fetched:', paymentsData);
        setData(paymentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-black">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Admin Page</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">Nama</th>
            <th className="py-2 px-4 border-b text-black">ID</th>
            <th className="py-2 px-4 border-b text-black">Bulan</th>
            <th className="py-2 px-4 border-b text-black">Tanggal Bayar</th>
            <th className="py-2 px-4 border-b text-black">Dokumen</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b text-black">{item.nama}</td>
              <td className="py-2 px-4 border-b text-black">{item.id}</td>
              <td className="py-2 px-4 border-b text-black">{item.bulan}</td>
              <td className="py-2 px-4 border-b text-black">{item.tanggalBayar}</td>
              <td className="py-2 px-4 border-b text-black">
                <a
                  href={item.dokumenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Lihat Dokumen
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
