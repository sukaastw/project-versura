'use client';

import Header from './header';
import Footer from './footer';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/pembayaran');
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
          <form>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" required />
            <label htmlFor="bulan">Bulan</label>
            <input type="text" id="bulan" name="bulan" required />
            <button type="submit">Cek Pembayaran</button>
          </form>
          <p>Jika terdapat kesalahan, silahkan hubungi <a href="msuka5641@gmail.com">Admin Website</a> atau dapat melalui Email Kami</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
