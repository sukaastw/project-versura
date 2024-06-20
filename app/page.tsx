
import Header from './header';
import Footer from './footer';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Sistem Pembayaran Terintegrasi</h1>
          <p>VERSURA merupakan sebuah aplikasi yang digunakan utuk pengintegrasian dalam mengirim dan mengecek pembayaran iuran.</p>
          <button>Ayo Bayar</button>
        </section>
        <section className={styles.formSection}>
          <h2>Cek Pembayaran</h2>
          <form>
            <label htmlFor="nim">ID</label>
            <input type="text" id="nim" name="nim" required />
            <label htmlFor="periode">Pilih Periode</label>
            <select id="periode" name="periode" required>
              <option value="">-- Pilih Periode --</option>
              <option value="periode1">Periode 1</option>
              <option value="periode2">Periode 2</option>
            </select>
            <button type="submit">Cek Pembayaran</button>
          </form>
          <p>Jika terdapat kesalahan, silahkan hubungi <a href="mailto:admin@example.com">Admin Website</a> atau dapat melalui Email Kami</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
