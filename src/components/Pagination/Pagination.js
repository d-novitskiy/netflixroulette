import React, { useState } from 'react';
import styles from './styles.module.css';
import { VisiblePages } from './VisiblePages';

export function Pagination({
  moviesPerPage, total, paginate, changeActivePage, currentPage,
}) {
  const visiblePagesAmount = 10;
  const pagesQuantity = Math.ceil(total / moviesPerPage);
  const pages = [];
  for (let i = 1; i <= pagesQuantity; i++) {
    pages.push(i);
  }
  // pagination of pages
  const visiblePagesQuantity = Math.ceil(pagesQuantity / visiblePagesAmount);
  const [visiblePages, setvisiblePages] = useState(1);
  const leftBorderNumber = (visiblePages - 1) * visiblePagesAmount + 1;
  const rightBorderNumber = visiblePages * visiblePagesAmount;
  const paginateHandler = (id) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    paginate(id);
  };
  const changeVisiblePages = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case 'first':
        setvisiblePages(1);
        changeActivePage(1);
        break;
      case 'prev':
        setvisiblePages(visiblePages - 1);
        changeActivePage(leftBorderNumber - 1);
        break;
      case 'next':
        setvisiblePages(visiblePages + 1);
        changeActivePage(leftBorderNumber + 10);
        break;
      case 'last':
        setvisiblePages(visiblePagesQuantity);
        changeActivePage(pagesQuantity);
        break;
      default: break;
    }
  };
  if (pages.length <= 1) {
    return null;
  }
  return (
    <div className={styles.container}>
      <ul>
        <li><button disabled={!(visiblePages > 1)} id="first" type="button" className={styles.btn} onClick={changeVisiblePages}>{'<<'}</button></li>
        <li><button disabled={!(visiblePages > 1)} id="prev" type="button" className={styles.btn} onClick={changeVisiblePages}>{'<'}</button></li>
        {pages.filter((page) => page >= leftBorderNumber && page <= rightBorderNumber)
          .map((item) => {
            return (
              <VisiblePages
                pageNumber={item}
                onClick={paginateHandler}
                isActive={currentPage === item}
                key={item}
              />
            );
          })}
        <li><button disabled={!(visiblePagesQuantity > visiblePages)} id="next" type="button" className={styles.btn} onClick={changeVisiblePages}>{'>'}</button></li>
        <li><button disabled={!(visiblePagesQuantity > visiblePages)} id="last" type="button" className={styles.btn} onClick={changeVisiblePages}>{'>>'}</button></li>
      </ul>
    </div>
  );
}
