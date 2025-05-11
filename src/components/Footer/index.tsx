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
          <span className={styles.linkSeparator}>/</span>
          <span>supported by</span>
          <Link to="https://ton.foundation" className={styles.copyrightLink}>
            TF <svg
              width="0.9em"
              height="0.9em"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.tonLogo}
              style={{
                verticalAlign: 'middle',
                marginLeft: '0.15em',
                marginBottom: '0.1em'
              }}
            >
              <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#0098EA"></path>
              <path d="M21.4629 8.92969H10.5363C8.52724 8.92969 7.25388 11.0969 8.26459 12.8488L15.0081 24.5372C15.4482 25.3004 16.551 25.3004 16.9911 24.5372L23.736 12.8488C24.7453 11.0996 23.472 8.92969 21.4643 8.92969H21.4629ZM15.0026 21.0321L13.534 18.1897L9.99036 11.8518C9.75659 11.4461 10.0454 10.9264 10.5349 10.9264H15.0013V21.0334L15.0026 21.0321ZM22.0061 11.8504L18.4638 18.1911L16.9952 21.0321V10.925H21.4616C21.9511 10.925 22.2399 11.4448 22.0061 11.8504Z" fill="white"></path>
            </svg>
          </Link>
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
