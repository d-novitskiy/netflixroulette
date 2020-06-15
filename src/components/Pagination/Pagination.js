import React, { useState } from 'react';
import styles from './styles.module.css';

export function Pagination({
  moviesPerPage, total, paginate,
}) {
  const pagesAmount = 10;
  const NumberOfPages = Math.ceil(total / moviesPerPage);
  const [active, setActive] = useState(1);
  const pages = {
    active,
    pages: [],
  };
  for (let i = 1; i <= NumberOfPages; i++) {
    pages.pages.push(i);
  }

  const pagesCount = Math.ceil(NumberOfPages / pagesAmount);
  const [pageNumber, setPageNumber] = useState(1);
  const leftBorderNumber = (pageNumber - 1) * pagesAmount + 1;
  const rightBorderNumber = pageNumber * pagesAmount;
  const paginateHandler = (e) => {
    e.preventDefault();
    paginate(e.target.id);
    setActive(e.target.id);
  };
  if (pages.pages.length <= 1) {
    return null;
  }
  return (
    <div className={styles.container}>
      <ul>
        <li><button disabled={!(pageNumber > 1)} id="first" type="button" className={styles.btn} onClick={() => setPageNumber(1)}>{'<<'}</button></li>
        <li><button disabled={!(pageNumber > 1)} id="prev" type="button" className={styles.btn} onClick={() => setPageNumber(pageNumber - 1)}>{'<'}</button></li>
        {pages.pages.filter((page) => page >= leftBorderNumber && page <= rightBorderNumber)
          .map((item) => {
            return <li><button type="button" id={item} onClick={paginateHandler} className={`${styles.btn} ${pages.active === item ? styles.active : ''}`}>{item}</button></li>;
          })}
        <li><button disabled={!(pagesCount > pageNumber)} id="next" type="button" className={styles.btn} onClick={() => setPageNumber(pageNumber + 1)}>{'>'}</button></li>
        <li><button disabled={!(pagesCount > pageNumber)} id="last" type="button" className={styles.btn} onClick={() => setPageNumber(pagesCount)}>{'>>'}</button></li>
      </ul>
    </div>
  );
}
