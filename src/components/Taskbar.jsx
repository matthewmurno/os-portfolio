import React from 'react';
import Clock from './Clock';
import styles from '../styles/Taskbar.module.css';

function Taskbar({ onStartClick }) {
  return (
    <div className={styles.taskbar}>
        <div className={styles['start-button']} onClick={onStartClick}>
            🟩 Start
        </div>
        <div className={styles['taskbar-spacer']} />
        <Clock className={styles['taskbar-clock']}/>
    </div>
  );
}

export default Taskbar;