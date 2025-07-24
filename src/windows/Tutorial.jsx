import React from 'react';
import AppWindow from '../components/AppWindow';
import styles from '../styles/Tutorial.module.css';

function Tutorial({ onClose }) {
  return (
    <AppWindow title="Welcome to ResumeOS" onClose={onClose} resizable={true} initialX={200} initialY={200}>
      <div className={styles.tutorialBody}>
        <p><strong>Hello, user.</strong></p>
        <p>This is a simulated desktop environment.</p>
        <ul className={styles.tutorialList}>
          <li>Click icons to open apps</li>
          <li>Drag windows around</li>
          <li>Use the Start menu to find other files</li>
          <li>Close windows with the X button</li>
        </ul>
        <p>Have fun exploring!</p>
        <button onClick={onClose} className={styles.tutorialButton}>
          Got it!
        </button>
      </div>
    </AppWindow>
  );
}

export default Tutorial;