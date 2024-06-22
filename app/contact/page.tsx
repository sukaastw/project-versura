import React from 'react';
import { FaEnvelope, FaInstagram, FaGithub } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1>Contact</h1>
      <div className={styles.contactItem}>
        <FaEnvelope className={styles.icon} />
        <a href="mailto:msuka5641@gmail.com" className={styles.label}>Emailku</a>
      </div>
      <div className={styles.contactItem}>
        <FaInstagram className={styles.icon} />
        <a href="https://instagram.com/mdsuka__" target="_blank" rel="noopener noreferrer" className={styles.label}>Instagram1</a>
      </div>
      <div className={styles.contactItem}>
        <FaInstagram className={styles.icon} />
        <a href="https://instagram.com/verrprajna" target="_blank" rel="noopener noreferrer" className={styles.label}>Instagram2</a>
      </div>
      <div className={styles.contactItem}>
        <FaInstagram className={styles.icon} />
        <a href="https://instagram.com/bramandita_bhaskara" target="_blank" rel="noopener noreferrer" className={styles.label}>Instagram3</a>
      </div>
      <div className={styles.contactItem}>
        <FaGithub className={styles.icon} />
        <a href="https://github.com/sukaastw" target="_blank" rel="noopener noreferrer" className={styles.label}>GitHub</a>
      </div>
    </div>
  );
};

export default Contact;