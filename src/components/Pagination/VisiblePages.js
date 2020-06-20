import React from 'react';
import styles from './styles.module.css';

export function VisiblePages({ pageNumber, onClick, isActive }) {
  function onClickHandler(e) {
    e.preventDefault();
    onClick(pageNumber);
  }
  return <li><button type="button" id={pageNumber} onClick={onClickHandler} className={`${styles.btn} ${isActive ? styles.active : ''}`}>{pageNumber}</button></li>;
}
