import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export function Movie({
  title, poster, onError, year, genres, id, onMovieClick, rating,
}) {
  const onClickHandler = () => {
    onMovieClick(id);
  };
  return (
    <Link to={`/movies/${id}`}>
      <div id={id} className={styles.container} onClick={onClickHandler} onKeyDown={() => id} role="button" tabIndex={0}>
        <div className={styles.poster}>
          <div className={styles.rating}>{rating}</div>
          <img alt={title} src={poster} onError={onError} />
        </div>
        <div className={styles.description}>
          <div className={styles.title}>{title}</div>
          <div className={styles.year}><span>{year}</span></div>
        </div>
        <div className={styles.genres}>{genres}</div>
      </div>
    </Link>
  );
}
