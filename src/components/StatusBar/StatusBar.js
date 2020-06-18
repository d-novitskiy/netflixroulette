import React from 'react';
import styles from './styles.module.css';

export function StatusBar({ children, select, onSortClick }) {
  function onClickHandler(e) {
    onSortClick(e.target.value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.counter}>{children}</div>
      <div>{select}</div>
      <div className={styles.sorting}>
        <span>Sort by</span>
        <ul className={styles.sortingBy}>
          <li>
            <button value="date" type="button" onClick={onClickHandler}>Realease date</button>
          </li>
          <li>
            <button value="rating" type="button" onClick={onClickHandler}>Rating</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
