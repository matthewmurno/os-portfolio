import React, { useEffect } from 'react';
import styles from '../styles/BootSequence.module.css';

function BootSequence({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={styles['boot-sequence']}>
      <h1>Booting ResumeOS...</h1>
    </div>
  );
}

export default BootSequence;