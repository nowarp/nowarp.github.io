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
  const [showNavbar, setShowNavbar] = useState(false);
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

  // DIRECT DOM MANIPULATION TO CONTROL NAVBAR
  useEffect(() => {
    // Function to update navbar visibility
    const updateNavbarVisibility = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const shouldShow = scrollPosition > viewportHeight * 0.7;

      console.log("SCROLL POS:", scrollPosition, "THRESHOLD:", viewportHeight * 0.7, "SHOULD SHOW:", shouldShow);

      // Find navbar and footer elements
      const navbar = document.querySelector('.navbar');
      const footer = document.querySelector('.footer');

      if (navbar) {
        console.log("FOUND NAVBAR, SETTING VISIBILITY:", shouldShow);
        navbar.style.setProperty('opacity', shouldShow ? '1' : '0', 'important');
        navbar.style.setProperty('visibility', shouldShow ? 'visible' : 'hidden', 'important');
        navbar.style.setProperty('transition', 'opacity 0.3s ease, visibility 0.3s ease', 'important');
      } else {
        console.log("NAVBAR NOT FOUND!");
      }

      if (footer) {
        footer.style.setProperty('opacity', shouldShow ? '1' : '0', 'important');
        footer.style.setProperty('visibility', shouldShow ? 'visible' : 'hidden', 'important');
        footer.style.setProperty('transition', 'opacity 0.3s ease, visibility 0.3s ease', 'important');
      }

      // Update state for React
      setShowNavbar(shouldShow);
    };

    // Initial update
    updateNavbarVisibility();

    // Add scroll listener
    window.addEventListener('scroll', updateNavbarVisibility);

    // Cleanup
    return () => window.removeEventListener('scroll', updateNavbarVisibility);
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
    <Layout
      wrapperClassName={showNavbar ? 'show-navbar' : 'hide-navbar'}
    >
      <Head>
        <title>nowarp - TON Security</title>
        <style>{`
          /* CSS to hide/show navbar/footer with proper specificity */
          .hide-navbar .navbar {
            opacity: 0 !important;
            visibility: hidden !important;
            transition: opacity 0.3s ease, visibility 0.3s ease !important;
          }
          .show-navbar .navbar {
            opacity: 1 !important;
            visibility: visible !important;
            transition: opacity 0.3s ease, visibility 0.3s ease !important;
          }
          .hide-navbar footer {
            opacity: 0 !important;
            visibility: hidden !important;
            transition: opacity 0.3s ease, visibility 0.3s ease !important;
          }
          .show-navbar footer {
            opacity: 1 !important;
            visibility: visible !important;
            transition: opacity 0.3s ease, visibility 0.3s ease !important;
          }
        `}</style>
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
          <p className={styles.heroSubtitleSmall}>Professional <a href="#audits" className={styles.inlineLink}>contract audits</a> and <a href="#tools" className={styles.inlineLink}>security tooling</a> for TON smart contracts</p>
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
                    Misti - TON Static Analyzer
                  </h3>
                  <p>
                    Static analyzer that finds security vulnerabilities, TON-specific pitfalls,
                    and optimization opportunities in smart contracts. Fully automatic, open-source,
                    and extensible for third-party security researchers. <a href="/tools/misti" className={styles.inlineLink}>
                    Learn how it works and try it yourself...</a>
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
                Professional security assessment for TON smart contracts through rigorous manual review and formal specification/verification when needed.
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

              <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col col--12">
                  <h4 style={{ marginBottom: '0rem' }}>Public Reports</h4>
                  <div className={styles.reportsGrid} style={{ marginTop: '0.5rem' }}>
                    <div className={styles.reportRow}>
                      <a href="https://proofofcapital.org/"
                         target="_blank"
                         rel="noopener noreferrer">
                        <img
                          src="/reports/proof-of-capital.jpeg"
                          alt="Proof of Capital Logo"
                          className={styles.projectLogo}
                        />
                      </a>
                      <div className={styles.contentColumn}>
                        <a href="https://proofofcapital.org/"
                           className={styles.projectLink}
                           target="_blank"
                           rel="noopener noreferrer">
                          Proof of Capital
                        </a>
                        <div className={styles.reportLink}>
                          <a href="https://raw.githubusercontent.com/nowarp/public-reports/master/2025-01-proof-of-capital.pdf" className={styles.pdfLink}>
                            <svg
                              className={styles.pdfIcon}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ color: '#FF4444', verticalAlign: 'middle' }}
                            >
                              <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
                            </svg>
                            report
                          </a>
                        </div>
                      </div>
                    </div>
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
