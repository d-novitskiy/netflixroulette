import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.css';

export function MovieDescription({
  title, genres, description, popularity, budget, img, displayDescription, style,
}) {
  const { id } = useParams();
  useEffect(() => {
    displayDescription(id);
  }, [id]);

  return (
    <div className={styles.modal} style={style}>
      <Link className={styles.modal} style={{ background: 'none' }} to="/" />
      <div className={styles.container}>
        <div style={{
          backgroundImage: `url(${img})`,
          backgroundColor: '#ccc',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '600px',
          margin: '0 auto',
        }}
        >
          <div className={styles.description}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.genres}>{genres}</div>
            <div className={styles.movieDescription}>{`Description: ${description}`}</div>
            <div className={styles.movieDescription}>{`Rating: ${popularity}`}</div>
            <div className={styles.movieDescription}>{`Budget: ${budget}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
