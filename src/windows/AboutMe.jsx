import React from 'react';
import AppWindow from '../components/AppWindow';
import styles from '../styles/AboutMe.module.css';

function AboutMe({ onClose, onFocus, style = {}, zIndex}) {
  return (
    <AppWindow
      title="About Me"
      onClose={onClose}
      onFocus={onFocus}
      style={{ ...style, zIndex }}
      initialX={100}
      initialY={100}
    >
      <div className={styles.aboutMeBody}>
        <p>
          Hello, user.<br />
          You’ve just opened the <strong>About Me</strong> system file.<br /><br />
          This instance of ResumeOS is powered by a creative software engineer with a passion
          for pixel art, game design, and quirky user interfaces.<br /><br />
          <em>System modules include:</em><br />
          – B.A. in Computer Science (Boston College)<br />
          – Minor in Digital Art<br />
          – Fluency in React, Node, Java, and Godot<br />
          – Fondness for strange ideas and fun UI patterns<br /><br />
          Feel free to explore the Projects folder,<br />
          or run <code>download resume</code> for a copy of my resume.
        </p>
      </div>
    </AppWindow>
  );
}

export default AboutMe;