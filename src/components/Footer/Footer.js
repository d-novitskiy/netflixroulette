import React from 'react';
import styles from './styles.module.css';

export function Footer({ siteName }) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{siteName}</span>
    </div>
  );
}
