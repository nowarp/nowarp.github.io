import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Welcome to Misti" description="The TON Static Analyzer">
      <header className={styles.heroBanner}>
        <div className={styles.textContainer}>
          <h1 className={styles.heroTitle}>Misti</h1>
          <p className={styles.heroSubtitle}>TON Security Tool</p>
          <p className={styles.heroSubtitleSmall}>
            Detect security issues in TON smart contracts before they reach
            production
          </p>
          <div className={styles.buttons}>
            <a className="button button--primary button--lg" href="/tools/misti/docs/">
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
              Misti is a comprehensive security tool designed to identify and
              prevent vulnerabilities in TON smart contracts. By streamlining
              the development process and integrating security checks early,
              Misti ensures your code remains robust and secure.
            </p>
              <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🔒 Code Analysis</h3>
                  <p>
                    Identify and fix potential{' '}
                    <a href="/tools/misti/docs/detectors">
                      security flaws and code problems
                    </a>{' '}
                    early in the development cycle.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>⚙️ CI/CD Integration</h3>
                  <p>
                    <a href="/tools/misti/docs/tutorial/ci-cd">Integrate</a> Misti
                    into your CI/CD pipeline to ensure continuous code quality
                    checks.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🛠️ Custom Detectors</h3>
                  <p>
                    Create{' '}
                    <a href="/tools/misti/docs/hacking/custom-detector">
                      custom detectors
                    </a>{' '}
                    to solve specific problems in your code or to provide a
                    thorough security review if you are an auditor.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className={`${styles.features} ${styles.sectionPadding} ${styles.alternateBackground}`}>
          <div className="container">
            <h2 className={styles.featuresTitle}>Discover Detectors</h2>
            <p className={styles.featuresSummary}>
              Misti supports 25 specialized detectors designed to identify code issues, detect vulnerabilities, and enforce best practices.
            </p>

  <div className={`${styles.rowWithMargin} row`}>
              {/* TON & Tact Specific */}
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🌐 TON & Tact Specific</h3>
                  <p>Detect patterns unique to TON and Tact that could lead to unintended behavior, such as <a href="/tools/misti/docs/detectors/CellOverflow">CellOverflow</a> or <a href="/tools/misti/docs/detectors/StringReceiversOverlap">StringReceiversOverlap</a>.</p>
                </div>
              </div>
              {/* DoS Prevention */}
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🚫 DoS Prevention</h3>
                  <p>Identify vulnerabilities that could lead to Denial of Service attacks, like <a href="/tools/misti/docs/detectors/SendInLoop">SendInLoop</a> or <a href="/tools/misti/docs/detectors/UnboundMap">UnboundMap</a>.</p>
                </div>
              </div>
              {/* Arithmetic Accuracy */}
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>➗ Arithmetic Accuracy</h3>
                  <p>Avoid critical calculation errors with detectors like <a href="/tools/misti/docs/detectors/DivideBeforeMultiply">DivideBeforeMultiply</a>.</p>
                </div>
              </div>
            </div>

  <div className={`${styles.rowWithMargin} row`}>
              {/* Access Control & Authorization */}
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🔐 Access Control</h3>
                  <p>Ensure only authorized entities perform actions, preventing unauthorized access with detectors like <a href="/tools/misti/docs/detectors/SuspiciousMessageMode">SuspiciousMessageMode</a>.</p>
                </div>
              </div>
              {/* Code Optimization */}
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>⚡ Code Optimization</h3>
                  <p>Enhance code efficiency and readability with detectors like <a href="/tools/misti/docs/detectors/OptimalMathFunction">OptimalMathFunction</a> and <a href="/tools/misti/docs/detectors/PreferAugmentedAssign">PreferAugmentedAssign</a>.</p>
                </div>
              </div>
              {/* Suspicious Patterns */}
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🕵️ Suspicious Patterns</h3>
                  <p>Uncover subtle issues in your code with detectors such as <a href="/tools/misti/docs/detectors/ZeroAddress">ZeroAddress</a> and <a href="/tools/misti/docs/detectors/InheritedStateMutation">InheritedStateMutation</a>.</p>
                </div>
              </div>
            </div>

            <div className={`${styles.buttons} ${styles.centerButton}`}>
              <a
                className="button button--primary button--lg"
                href="/tools/misti/docs/detectors"
              >
                View All Detectors
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
