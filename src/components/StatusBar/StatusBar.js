import React from 'react';
import styles from './styles.module.css';

export function StatusBar({
  children, select, onSortClick, active,
}) {
  function onClickHandler(e) {
    onSortClick(e.target.value);
  }
  return (
    <div className={styles.container}>
      <div className={styles.counter}>{children}</div>
      <div className={styles.select}>{select}</div>
      <div className={styles.sorting}>
        <span>Sort by:</span>
        <ul className={styles.sortingBy}>
          <li>
            <button className={active === 'release_date' ? `${styles.btn} ${styles.active}` : styles.btn} value="release_date" type="button" onClick={onClickHandler}>Realease date</button>
          </li>
          <li>
            <button className={active === 'vote_average' ? `${styles.btn} ${styles.active}` : styles.btn} value="vote_average" type="button" onClick={onClickHandler}>Rating</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
