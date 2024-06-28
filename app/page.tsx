// pages/pembayaran.tsx
'use client';
import { useState } from 'react';
import { db } from './db/firebase'; // Sesuaikan path berdasarkan struktur proyek Anda
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from './header'; // Sesuaikan path berdasarkan struktur proyek Anda
import Footer from './footer'; // Sesuaikan path berdasarkan struktur proyek Anda';
import styles from './styles.module.css';

const Pembayaran = () => {
  const [id, setId] = useState('');
  const [bulan, setBulan] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Query untuk mencari user berdasarkan ID
      const usersRef = collection(db, 'Users');
      const userQuery = query(usersRef, where('id', '==', id));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        setPaymentStatus('User tidak ditemukan');
        return;
      }

      // Mengambil ID user dari hasil query
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;

      // Query untuk mencari pembayaran berdasarkan ID user dan bulan
      const paymentsRef = collection(db, 'Payments');
      const paymentQuery = query(paymentsRef, where('bulan', '==', bulan));
      const paymentSnapshot = await getDocs(paymentQuery);

      if (paymentSnapshot.empty) {
        setPaymentStatus('Belum bayar');
      } else {
        setPaymentStatus('Anda sudah bayar');
      }
    } catch (error) {
      console.error('Error mengambil data pembayaran: ', error);
      setPaymentStatus('Error dalam mengambil data pembayaran');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Sistem Pembayaran Terintegrasi</h1>
          <p>VERSURA merupakan sebuah aplikasi yang digunakan untuk pengintegrasian dalam mengirim dan mengecek pembayaran iuran.</p>
        </section>
        <section className={styles.formSection}>
          <h2>Cek Pembayaran</h2>
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={styles.input}
              required
            />
            <label htmlFor="bulan">Bulan</label>
            <select
              id="bulan"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Pilih Bulan</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
            <button type="submit" className={styles.button}>
              Cek Pembayaran
            </button>
          </form>
          {paymentStatus && <p className={styles.paymentStatus}>{paymentStatus}</p>}
          <p>Jika terdapat kesalahan, silahkan hubungi <a href="mailto:msuka5641@gmail.com">Admin Website</a> atau dapat melalui Email Kami</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pembayaran;
