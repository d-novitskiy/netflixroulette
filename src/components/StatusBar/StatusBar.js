import React from 'react';
import styles from './styles.module.css';

export function StatusBar({ children, checked }) {
  return (
    <div className={styles.container}>
      <div className={styles.counter}>{children}</div>
      <div className={styles.sorting}>
        <span>Sort by</span>
        <ul className={styles.sortingBy}>
          <li>
            Realease date
          </li>
          <li>
            Rating
          </li>
        </ul>
      </div>
    </div>
  );
}
