import React from 'react';
import styles from '../styles/Experience.module.css';
import AppWindow from '../components/AppWindow';

const experienceItems = [
  {
    title: 'Audio Visual Media/Print Assistant',
    company: 'Creative Studio Inc.',
    date: 'July 2023 - August 2023',
    bullets: [
      'Designed promotional materials, illustrations, and layouts for print and web',
      'Collaborated with the marketing team to align visuals with brand strategy',
      'Gained experience in Adobe Suite, Figma, and iterative design feedback',
    ],
  },
  {
    title: 'Contract AI Training Contributor',
    company: 'DataAnnotation',
    date: 'April 2025–Present',
    bullets: [
      'Participated in data annotation and model evaluation tasks',
      'Provided feedback and rankings for generative AI outputs',
      'Flexible, task-based remote contract work',
    ],
  },
];

function Experience({ onClose, onFocus, zIndex, style = {}, id }) {
  return (
    <AppWindow
      title="experience.log"
      onFocus = {onFocus}
      onClose={onClose}
      zIndex={zIndex}
      style={{ ...style, zIndex }}
      id={id}
    >
      <div className={styles.experienceContainer}>
        {experienceItems.map((item, index) => (
          <div key={index} className={styles.experienceItem}>
            <p className={styles.jobTitle}>
              ➜ {item.title} <span className={styles.company}>@ {item.company}</span>
            </p>
            <p className={styles.date}>{item.date}</p>
            <ul className={styles.bulletList}>
              {item.bullets.map((bullet, i) => (
                <li key={i}>• {bullet}</li>
              ))}
            </ul>
            {index < experienceItems.length - 1 && <hr className={styles.divider} />}
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

export default Experience;