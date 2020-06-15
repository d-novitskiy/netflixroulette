import React from 'react';
import styles from './styles.module.css';

export function SelectMoviesPerPage({ value, onSelectChange }) {
  const onChangeHandler = (e) => {
    onSelectChange(e.target.value);
  };
  return (
    <div className={styles.container}>
      <span>show</span>
      <select className={styles.select} value={value} onChange={onChangeHandler}>
        <option value="9">9</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <span>movies per page</span>
    </div>
  );
}
