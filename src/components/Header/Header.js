import React from 'react';
import styles from './styles.module.css';
import { Button } from '../Button';
import { SearchBy } from '../SearchBy';

export function Header({
  placeholder, onSearchClick, onSearchByClick, value, onChange, searchBy, onSubmit, siteName,
}) {
  const onChangeHandler = (e) => {
    onChange(e.target.value);
  };
  const onSearchByHandler = (e) => {
    onSearchByClick(e.target.id);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{siteName}</h1>
        <div className={styles.searchForm}>
          <span className={styles.span}>Find your movie</span>
          <form onSubmit={onSubmit}>
            <div className={styles.search}>
              <input onChange={onChangeHandler} value={value} placeholder={placeholder} className={styles.input} type="text" />
              <span className={styles.enter} />
            </div>
            <div className={styles.controlPanel}>
              <SearchBy onSearchByClick={onSearchByHandler} searchBy={searchBy} />
              <div>
                <Button
                  className={styles.btn}
                  onClick={onSearchClick}
                >
                  search

                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
