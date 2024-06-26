// pages/pembayaran.tsx
'use client';
import { useState } from 'react';
import { db } from './db/firebase';// Sesuaikan path berdasarkan struktur proyek Anda
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from './header';
import Footer from './footer';
import styles from './styles.module.css';

const Pembayaran = () => {
  const [id, setId] = useState('');
  const [bulan, setBulan] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Query untuk mencari pembayaran sesuai ID dan bulan
      const paymentsRef = collection(db, 'Payments');
      const q = query(paymentsRef, where('user_id', '==', id), where('bulan', '==', bulan));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
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
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <label htmlFor="bulan">Bulan</label>
            <select
              id="bulan"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cek Pembayaran
            </button>
          </form>
          {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
          <p>Jika terdapat kesalahan, silahkan hubungi <a href="mailto:msuka5641@gmail.com">Admin Website</a> atau dapat melalui Email Kami</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pembayaran;
