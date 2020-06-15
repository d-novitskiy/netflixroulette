import React from 'react';
import styles from './styles.module.css';
import { Button } from '../Button';

export function SearchBy({ search, onSearchByClick }) {
  const searchBy = {
    active: search,
    buttons: [
      'title',
      'genres',
    ],
  };
  return (
    <div>
      <span className={styles.searchSpan}>Search by</span>
      {
      searchBy.buttons.map((item, index) => {
        return (
          <Button
            key={index}
            id={item}
            className={`${styles.btn} ${searchBy.active === item ? `${styles.active}` : ''}`}
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
