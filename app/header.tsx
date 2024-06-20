import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">HMJ</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/about">Periode Iuran</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
