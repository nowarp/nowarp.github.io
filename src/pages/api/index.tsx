import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './../index.module.css';

export default function APIReference() {
  return (
    <Layout description="API Reference Documentation">
      <Head>
        <title>API Reference - TON Developer Tools</title>
      </Head>
      <main>
        {/* API Overview Section */}
        <section id="api-overview" className={`${styles.features} ${styles.sectionPadding}`}>
          <div className="container">
            <h2 className={styles.featuresTitle}>API Documentation</h2>
            <p className={styles.featuresSummary}>
              Access comprehensive API documentation for our developer tools and libraries.
              These references provide detailed information about functions, classes, and methods
              to help you build custom security tools for TON.
            </p>
            <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3>Misti</h3>
                  <p>
                    Detailed API documentation for <i className="fab fa-github"></i> <a href="https://github.com/nowarp/misti" target="_blank" rel="noopener noreferrer">nowarp/misti</a>, our TON static analyzer tool for smart contract security.
                  </p>
                  <div className={styles.buttons}>
                    <a className="button button--primary" href="/api/misti/">
                      View Misti API
                    </a>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3>Souffle.js</h3>
                  <p>
                    Complete API reference for <i className="fab fa-github"></i> <a href="https://github.com/nowarp/souffle.js" target="_blank" rel="noopener noreferrer">nowarp/souffle.js</a>, the JavaScript library for <a href="https://souffle-lang.github.io/">Souffle</a> interaction.
                  </p>
                  <div className={styles.buttons}>
                    <a className="button button--primary" href="/api/souffle-js/">
                      View Souffle.js API
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="api-support" className={`${styles.features} ${styles.sectionPadding}`}>
          <div className="container">
            <h2 className={styles.featuresTitle}>Questions?</h2>
            <p className={styles.featuresSummary}>
              We are available in the <a href="https://t.me/tonsec_chat" target="_blank" rel="noopener noreferrer">Telegram Group</a>.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
