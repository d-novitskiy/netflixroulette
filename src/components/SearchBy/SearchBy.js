import React from 'react';
import styles from './styles.module.css';
import { Button } from '../Button';

export function SearchBy({ searchBy, onSearchByClick }) {
  const buttons = [
    'title',
    'genres',
  ];
  return (
    <div className={styles.searchBy}>
      <span className={styles.searchSpan}>Search by</span>
      {
      buttons.map((item) => {
        return (
          <Button
            key={item}
            id={item}
            className={`${styles.btn} ${searchBy === item ? `${styles.active}` : ''}`}
            onClick={onSearchByClick}
          >
            {item}
          </Button>
        );
      })
      }
    </div>
  );
}
