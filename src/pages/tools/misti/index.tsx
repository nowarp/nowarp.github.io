import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Welcome to Misti"
      description="The TON Static Analyzer">
      <header className={styles.heroBanner}>
        <div className={styles.textContainer}>
          <h1 className={styles.heroTitle}>Misti</h1>
          <p className={styles.heroSubtitle}>TON Security Tool</p>
          <p className={styles.heroSubtitleSmall}>Detects security issues in TON smart contracts before they reach production</p>
          <div className={styles.buttons}>
            <a
              className="button button--primary button--lg"
              href="/tools/misti/docs/">
              Get Started
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className={`${styles.features} ${styles.sectionPadding}`}>
          <div className="container">
            <h2 className={styles.featuresTitle}>Misti Overview</h2>
            <p className={styles.featuresSummary}>
              Misti is a comprehensive security tool designed to identify and prevent vulnerabilities in TON smart contracts. By streamlining the development process and integrating security checks early, Misti ensures your code remains robust and secure.
            </p>
            <div className="row">
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🔒 Code Analysis</h3>
                  <p>Identify and fix potential <a href="/tools/misti/docs/detectors">security flaws and code problems</a> early in the development cycle.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>⚙️ CI/CD Integration</h3>
                  <p><a href="/tools/misti/docs/tutorial/ci-cd">Integrate</a> Misti into your CI/CD pipeline to ensure continuous code quality checks.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🛠️ Custom Detectors</h3>
                  <p>Create <a href="/tools/misti/docs/hacking/custom-detector">custom detectors</a> to solve specific problems in your code or to provide a thorough security review if you are an auditor.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {}
      </main>
    </Layout>
  );
}
