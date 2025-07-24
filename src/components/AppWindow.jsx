
import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import styles from '../styles/AppWindow.module.css';

function AppWindow({  title, onClose, children, initialX = 100, initialY = 100, resizable = true, onFocus = () => {}, style = {} }) {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const [size, setSize] = useState({
    width: style.width || 320,
    height: style.height || 240,
  });
  const initialSizeRef = useRef(size);

  const positionRef = useRef({ x: initialX, y: initialY });

  const bindDrag = useDrag(({ first, movement: [mx, my] }) => {
    if (first) {
      positionRef.current = { x: x.get(), y: y.get() };
    }

    x.set(positionRef.current.x + mx);
    y.set(positionRef.current.y + my);
  });
  
  const bindResize = useDrag(({ first, movement: [mx, my] }) => {
    if (first) initialSizeRef.current = size;
    setSize({
      width: Math.max(200, initialSizeRef.current.width + mx),
      height: Math.max(150, initialSizeRef.current.height + my),
    });
  });

  return (
    <motion.div
      className={styles.appWindow}
      style={{ ...style, x, y, width: size.width, height: size.height}}
      onMouseDown={onFocus}
    >
      <div className={styles.titleBar} {...bindDrag()}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>

      <div className={styles.windowBody} style={{ height: size.height - 24 }}>
        {children}
      </div>

      {resizable && <div className={styles.resizeHandle} {...bindResize()} />}
    </motion.div>
  );
}

export default AppWindow;
