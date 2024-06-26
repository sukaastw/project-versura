'use client';

import { useState } from 'react';
import Header from './header';
import Footer from './footer';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handleButtonClick = () => {
    router.push('/pembayaran');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;
    const bulan = formData.get('bulan') as string;

    // Dummy logic for checking payment status
    // Replace this with your actual payment status check
    if (id && bulan) {
      if (Math.random() > 0.5) {
        setPaymentStatus('Anda sudah bayar');
      } else {
        setPaymentStatus('Belum bayar');
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Sistem Pembayaran Terintegrasi</h1>
          <p>VERSURA merupakan sebuah aplikasi yang digunakan untuk pengintegrasian dalam mengirim dan mengecek pembayaran iuran.</p>
          <button onClick={handleButtonClick}>Ayo Bayar</button>
        </section>
        <section className={styles.formSection}>
          <h2>Cek Pembayaran</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" required />
            <label htmlFor="bulan">Bulan</label>
            <select id="bulan" name="bulan" required>
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
            <button type="submit">Cek Pembayaran</button>
          </form>
          {paymentStatus && <p>{paymentStatus}</p>}
          <p>Jika terdapat kesalahan, silahkan hubungi <a href="mailto:msuka5641@gmail.com">Admin Website</a> atau dapat melalui Email Kami</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
