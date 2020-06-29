import React from 'react';
import styles from './styles.module.css';

export function VisiblePages({
  id, pageNumber, onClick, isActive, disabled,
}) {
  function onClickHandler() {
    onClick(pageNumber);
  }
  return <li key={id}><button disabled={disabled} type="button" id={pageNumber} onClick={onClickHandler} className={`${styles.btn} ${isActive ? styles.active : ''}`}>{pageNumber}</button></li>;
}
