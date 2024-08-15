import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Welcome to Misti"
      description="The TON Static Analyzer">
      <header className={styles.heroBanner}>
        <h1 className={styles.heroTitle}>Welcome to Misti</h1>
        <p className={styles.heroSubtitle}>The tool for static analysis in the TON ecosystem.</p>
        <div className={styles.buttons}>
          <a
            className="button button--primary button--lg"
            href="/tools/misti/docs/">
            Get Started
          </a>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <h2>🔒 Detect Code Issues</h2>
                <p>Identify and fix potential security flaws and code style problems early in the development cycle.</p>
              </div>
              <div className="col col--4">
                <h2>⚙️ Streamline Development</h2>
                <p>Integrate Misti into your CI/CD pipeline to ensure continuous code quality checks.</p>
              </div>
              <div className="col col--4">
                <h2>🛠️ Custom Detectors</h2>
                <p>Create custom detectors to solve specific problems in your code or to provide a thorough security review if you are an auditor.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
