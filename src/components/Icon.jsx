import React from 'react';
import styles from '../styles/Icon.module.css';

function Icon({ label, icon, onClick, onDrop, onDragEnd, onDragStart }) {
  return (
    <div
      className={styles.icon}
      onClick={onClick}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      draggable={true}
    >
      <img src={icon} alt={label} width="32" height="32" draggable={false} className={styles.iconImg} />
      <span>{label}</span>
    </div>
  );
}
export default Icon;