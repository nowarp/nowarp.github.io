import React from 'react';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from './styles.module.css';

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* COPYRIGHT SECTION - LEFT SIDE */}
        <div className={styles.copyrightSection}>
          <span>© {new Date().getFullYear()}</span>
          <Link to="/" className={styles.copyrightLink}>nowarp</Link>
        </div>

        {/* LINKS SECTION - RIGHT SIDE */}
        <div className={styles.linksSection}>
          <Link to="https://t.me/nowarp_io" className={styles.footerLink}>
            <FontAwesomeIcon icon={faTelegram} className={styles.icon} />
            nowarp_io
          </Link>
          <span className={styles.linkSeparator}>/</span>
          <Link to="https://x.com/nowarp_io" className={styles.footerLink}>
            <FontAwesomeIcon icon={faXTwitter} className={styles.icon} />
            nowarp_io
          </Link>
          <span className={styles.linkSeparator}>/</span>
          <Link to="https://github.com/nowarp/" className={styles.footerLink}>
            <FontAwesomeIcon icon={faGithub} className={styles.icon} />
            nowarp
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
