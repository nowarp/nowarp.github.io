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
        {/* Misti Section */}
        <section id="api-overview" className={`${styles.features} ${styles.sectionPadding}`}>
          <div className="container">
            <h2 className={styles.featuresTitle}>Misti</h2>
            <p className={styles.featuresSummary}>
              Access comprehensive API documentation for libraries related to the Misti analyzer.
              These references provide detailed information about functions, classes, and methods
              to help you build custom security tools for the <a href="https://tact-lang.org" target="_blank" rel="noopener noreferrer">Tact language</a>.
            </p>
            <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3>
                    <i className="devicon-typescript-plain" style={{ marginRight: '5px', color: '#3178C6', position: 'relative', top: '2px', fontSize: '20px' }}></i>
                    Misti
                  </h3>
                  <p>
                    Detailed API documentation for <i className="fab fa-github"></i> <a href="https://github.com/nowarp/misti" target="_blank" rel="noopener noreferrer">nowarp/misti</a>, our TON static analyzer tool for smart contract security. Build custom detectors to implement additional security checks.
                  </p>
                  <div className={styles.buttons}>
                    <a className="button button--primary" href="/api/misti/" target="_blank" rel="noopener noreferrer">
                      View Misti API <i className="fa fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3>
                    <i className="devicon-typescript-plain" style={{ marginRight: '5px', color: '#3178C6', position: 'relative', top: '2px', fontSize: '20px' }}></i>
                    Souffle.js
                  </h3>
                  <p>
                    Complete API reference for <i className="fab fa-github"></i> <a href="https://github.com/nowarp/souffle.js" target="_blank" rel="noopener noreferrer">nowarp/souffle.js</a>, the JavaScript library for <a href="https://souffle-lang.github.io/">Souffle</a> interaction.
                  </p>
                  <div className={styles.buttons}>
                    <a className="button button--primary" href="/api/souffle-js/" target="_blank" rel="noopener noreferrer">
                      View Souffle.js API <i className="fa fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Libraries Section */}
        <section id="other-libraries" className={`${styles.features} ${styles.sectionPadding}`}>
          <div className="container">
            <h2 className={styles.featuresTitle}>Other Libraries</h2>
            <p className={styles.featuresSummary}>
              Explore our additional development libraries that support the TON ecosystem.
            </p>
            <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3>
                    <i className="devicon-ocaml-plain" style={{ marginRight: '5px', color: '#EC6813', position: 'relative', top: '2px', fontSize: '20px' }}></i>
                    OCaml FunC
                  </h3>
                  <p>
                    <i className="fab fa-github"></i> <a href="https://github.com/nowarp/ocaml-func" target="_blank" rel="noopener noreferrer">nowarp/ocaml-func</a> is an OCaml library providing AST and parser for FunC.
                  </p>
                  <div className={styles.buttons}>
                    <a className="button button--primary" href="https://github.com/nowarp/ocaml-func/blob/master/src/bin/driver.ml" target="_blank" rel="noopener noreferrer">
                      See Usage Example <i className="fa fa-external-link-alt"></i>
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
