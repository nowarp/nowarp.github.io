import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import { FaTelegramPlane, FaEnvelope } from 'react-icons/fa';
import { useLocation } from '@docusaurus/router';
import '../css/custom.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number;
}

const PARTICLE_COUNT = 50;
const MAX_SPEED = 0.5;
const CONNECTION_DISTANCE = 150;
const MIN_CONNECTIONS = 2;

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const location = useLocation();
  const [textColor, setTextColor] = useState('var(--ifm-color-primary-dark)');

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let computedStyle = getComputedStyle(document.documentElement);
    let BACKGROUND_COLOR = document.documentElement.dataset.theme === 'dark'
      ? getComputedStyle(document.body).backgroundColor
      : computedStyle.getPropertyValue('--ifm-color-white').trim();
    let PARTICLE_COLOR = document.documentElement.dataset.theme === 'dark'
      ? computedStyle.getPropertyValue('--ifm-color-white').trim()
          : computedStyle.getPropertyValue('--ifm-color-primary').trim();

    let particles: Particle[] = [];

    const initParticles = (width: number, height: number): Particle[] => {
      const particles: Particle[] = [];

      // Keep generating until we have enough PROPERLY CONNECTED particles
      while (particles.length < PARTICLE_COUNT) {
        const particle: Particle = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * MAX_SPEED,
          vy: (Math.random() - 0.5) * MAX_SPEED,
          radius: 2,
          connections: 0
        };

        // Check connections with existing particles
        let connectionCount = 0;
        for (const existing of particles) {
          const dx = particle.x - existing.x;
          const dy = particle.y - existing.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            connectionCount++;
            existing.connections++;  // Update existing particle's connections
          }
        }

        // Only add if it has enough connections or we're desperate
        if (connectionCount >= MIN_CONNECTIONS || particles.length < PARTICLE_COUNT/2) {
          particle.connections = connectionCount;
          particles.push(particle);
        }
      }

      // ENSURE MINIMUM CONNECTIONS BY ADJUSTING POSITIONS IF NEEDED
      for (const particle of particles) {
        if (particle.connections < MIN_CONNECTIONS) {
          let attempts = 0;
          while (particle.connections < MIN_CONNECTIONS && attempts < 50) {
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;

            particle.connections = 0;
            for (const other of particles) {
              if (other === particle) continue;

              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < CONNECTION_DISTANCE) {
                particle.connections++;
                other.connections++;
              }
            }
            attempts++;
          }
        }
      }

      return particles;
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.scale(dpr, dpr);

      // Reinitialize particles for new dimensions
      particles = initParticles(displayWidth, displayHeight);
    };

    // INITIALIZE WITH PROPER DIMENSIONS
    resizeCanvas();

    // HANDLE RESIZE LIKE A PROPER OPERATING SYSTEM
    const resizeObserver = new ResizeObserver(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeCanvas();
      animationRef.current = requestAnimationFrame(draw);
    });

    resizeObserver.observe(document.body);

    const draw = () => {
      // UPDATE COLORS ON EVERY FRAME TO HANDLE THEME CHANGES
      computedStyle = getComputedStyle(document.documentElement);
      BACKGROUND_COLOR = document.documentElement.dataset.theme === 'dark'
        ? getComputedStyle(document.body).backgroundColor
        : computedStyle.getPropertyValue('--ifm-color-white').trim();
      PARTICLE_COLOR = document.documentElement.dataset.theme === 'dark'
        ? computedStyle.getPropertyValue('--ifm-color-secondary').trim()
        : computedStyle.getPropertyValue('--ifm-color-primary').trim();

      // Properly clear the whole damn canvas and set the proper background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${PARTICLE_COLOR}80`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 0.2 * (1 - distance/CONNECTION_DISTANCE);
            ctx.strokeStyle = `${PARTICLE_COLOR}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);  // STORE THE REF SO WE CAN CANCEL IT PROPERLY
    };

    // ALSO LISTEN FOR THEME CHANGES LIKE A PROPER PROGRAMMER
    const themeObserver = new MutationObserver(() => {
      computedStyle = getComputedStyle(document.documentElement);
      BACKGROUND_COLOR = document.documentElement.dataset.theme === 'dark'
        ? getComputedStyle(document.body).backgroundColor
        : computedStyle.getPropertyValue('--ifm-color-white').trim();
      PARTICLE_COLOR = computedStyle.getPropertyValue('--ifm-color-primary').trim();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      themeObserver.disconnect(); // CLEAN UP YOUR GARBAGE
    };
  }, []);

  useEffect(() => {
    // OBSERVE THEME CHANGES FOR TEXT COLOR
    const updateTextColor = () => {
      const isDarkTheme = document.documentElement.dataset.theme === 'dark';
      setTextColor(isDarkTheme ? 'var(--ifm-color-secondary)' : 'var(--ifm-color-primary-dark)');
    };

    // Initial color setting
    updateTextColor();

    // Listen for theme changes
    const themeObserver = new MutationObserver(updateTextColor);

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => themeObserver.disconnect();
  }, []);

  return (
    <Layout>
      <Head>
        <title>nowarp - Web3 Security</title>
      </Head>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
      }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
        <div className={styles.textContainer} style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textAlign: 'left',
          color: textColor,
          opacity: 0.9
        }}>
          <h1 className={styles.heroTitle}>nowarp</h1>
          <p className={styles.heroSubtitleSmall}>Professional smart contracts <a href="#audits" className={styles.inlineLink}>audits</a> and <a href="#tools" className={styles.inlineLink}>security tooling</a></p>
        </div>
      </div>

      <main style={{ marginTop: '1rem' }}>
        {/* Container 1: Tools */}
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div className={styles.featureBox}>
            <section id="tools" className={styles.features}>
              <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Security Tools</h2>
              <div className="row">
                <div className="col col--12">
                  <h3>
                    <img
                      src="/img/misti.svg"
                      alt="Misti"
                      style={{
                        height: '1em',
                        verticalAlign: 'middle',
                        marginRight: '0.5em'
                      }}
                    />
                    Misti
                  </h3>
                  <p>
                    Static analyzer that finds security vulnerabilities, <a href="https://ton.org">TON</a>-specific pitfalls,
                    and optimization opportunities in smart contracts. Fully automatic, open-source,
                    and extensible for third-party security researchers. <a href="/tools/misti" className={styles.inlineLink}>
                    Learn how it works and try it yourself...</a>
                  </p>
                </div>
              </div>
              <div className="row" style={{ marginTop: '0rem' }}>
                <div className="col col--12">
                  <h3>
                    <img
                      src="/img/scan.svg"
                      alt="Scanner"
                      style={{
                        height: '1em',
                        verticalAlign: 'middle',
                        marginRight: '0.5em'
                      }}
                    />
                    Scanner
                  </h3>
                  <p>
                    Web-interface to the demo version of mass-scan that runs code analysis over contracts publicly available on{' '}
                    <a href="https://verifier.ton.org" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                      verifier.ton.org
                    </a> and{' '}
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                      GitHub
                    </a>. Only a couple of these contracts are displayed - manually verified projects that 
                    don't contain any vulnerabilities. <a href="/tools/scanner" className={styles.inlineLink}>
                    Try the scanner...</a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Container 2: Audits */}
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div className={styles.featureBox}>
            <section id="audits" className={styles.features}>
              <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Smart Contract Audits</h2>
              <p className={styles.featuresSummary}>
                Professional smart contracts security assessment through rigorous manual review and formal specification/verification when needed.
              </p>

              <div className="row">
                <div className="col col--12">
                  <h4 style={{ marginBottom: '0rem' }}>Approach</h4>
                  <ul className={styles.auditPoints} style={{ marginBottom: 0 }}>
                    <li>Small experienced technical team</li>
                    <li>Clear communication and formalized processes</li>
                    <li>We only accept projects we can thoroughly verify</li>
                    <li>Once engaged, we support you through all stages</li>
                  </ul>
                </div>
              </div>

              <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col col--12">
                  <p style={{ marginTop: '0.5rem' }}>References available upon request.</p>
                </div>
              </div>

              <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col col--12">
                  <h4 style={{ marginBottom: '0rem' }}>Contacts</h4>
                  <div className={styles.contactLinks}>
                    <a href="https://t.me/jubnzv" className={styles.contactLink} style={{ marginRight: '1rem' }}>
                      <FaTelegramPlane style={{ verticalAlign: 'middle' }} /> @jubnzv
                    </a>
                    <a href="mailto:oi@nowarp.io" className={styles.contactLink}>
                      <FaEnvelope style={{ verticalAlign: 'middle' }} /> oi@nowarp.io
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
