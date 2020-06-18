import React, { useState } from 'react';
import styles from './styles.module.css';

export function Pagination({
  moviesPerPage, total, paginate,
}) {
  const pagesAmount = 10;
  const NumberOfPages = Math.ceil(total / moviesPerPage);
  const pages = [];
  for (let i = 1; i <= NumberOfPages; i++) {
    pages.push(i);
  }

  const pagesCount = Math.ceil(NumberOfPages / pagesAmount);
  const [pageNumber, setPageNumber] = useState(1);
  const leftBorderNumber = (pageNumber - 1) * pagesAmount + 1;
  const rightBorderNumber = pageNumber * pagesAmount;
  const paginateHandler = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'auto' });
    paginate(e.target.id);
  };
  if (pages.length <= 1) {
    return null;
  }
  return (
    <div className={styles.container}>
      <ul>
        <li><button disabled={!(pageNumber > 1)} id="first" type="button" className={styles.btn} onClick={() => setPageNumber(1)}>{'<<'}</button></li>
        <li><button disabled={!(pageNumber > 1)} id="prev" type="button" className={styles.btn} onClick={() => setPageNumber(pageNumber - 1)}>{'<'}</button></li>
        {pages.filter((page) => page >= leftBorderNumber && page <= rightBorderNumber)
          .map((item) => {
            return <li key={item}><button type="button" id={item} onClick={paginateHandler} className={styles.btn}>{item}</button></li>;
          })}
        <li><button disabled={!(pagesCount > pageNumber)} id="next" type="button" className={styles.btn} onClick={() => setPageNumber(pageNumber + 1)}>{'>'}</button></li>
        <li><button disabled={!(pagesCount > pageNumber)} id="last" type="button" className={styles.btn} onClick={() => setPageNumber(pagesCount)}>{'>>'}</button></li>
      </ul>
    </div>
  );
}
