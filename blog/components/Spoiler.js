import React, { useState } from 'react';
import styles from './Spoiler.module.css';

export default function Spoiler({ children, showText = 'Show spoiler', hideText = 'Hide spoiler' }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.spoilerContainer}>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={styles.spoilerLine}
      >
        &gt; {isVisible ? hideText : showText}
      </div>
      {isVisible && (
        <div className={styles.spoilerContent} style={{ display: 'block' }}>
          {children}
        </div>
      )}
    </div>
  );
}


