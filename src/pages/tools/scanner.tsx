import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './../index.module.css';

export default function S() {
  return (
    <Layout title="Scanner" description="TON Scanner is no longer available">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <header className={styles.heroBanner}>
        <div className={styles.textContainer}>
          <h1 className={styles.heroTitle}>TON Scanner</h1>
          <p className={styles.heroSubtitle}>No longer available</p>
          <p className={styles.heroSubtitleSmall}>
            The public scanner demo has been shut down.
          </p>
          <div className={styles.buttons}>
            <a className="button button--primary button--lg" href="/">
              Back to nowarp
            </a>
          </div>
        </div>
      </header>
    </Layout>
  );
}
