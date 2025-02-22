import React, { useEffect, useRef } from 'react';
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

    const computedStyle = getComputedStyle(document.documentElement);
    const BACKGROUND_COLOR = document.documentElement.dataset.theme === 'dark'
      ? getComputedStyle(document.body).backgroundColor
      : computedStyle.getPropertyValue('--ifm-color-white').trim();
    const PARTICLE_COLOR = computedStyle.getPropertyValue('--ifm-color-primary').trim();

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

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Head>
        <title>nowarp - TON Security</title>
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
          color: 'var(--ifm-color-primary-dark)'
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

        {/* Container 3: Community - BECAUSE APPARENTLY EMAIL ISN'T GOOD ENOUGH ANYMORE */}
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div className={styles.featureBox}>
            <section id="community" className={styles.features}>
              <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Community</h2>
              <div className="row">
                <div className="col col--12">
                  <div className={styles.contactLinks}>
                    <a href="https://t.me/nowarp_io" 
                       className={styles.contactLink} 
                       style={{ marginRight: '1rem' }}
                       target="_blank"
                       rel="noopener noreferrer">
                      <FaTelegramPlane style={{ verticalAlign: 'middle' }} /> @nowarp_io
                    </a>
                    <a href="https://t.me/tonsec_chat" 
                       className={styles.contactLink} 
                       style={{ marginRight: '1rem' }}
                       target="_blank"
                       rel="noopener noreferrer">
                      <FaTelegramPlane style={{ verticalAlign: 'middle' }} /> @tonsec_chat
                    </a>
                    <a href="https://github.com/nowarp" 
                       className={styles.contactLink}
                       target="_blank"
                       rel="noopener noreferrer">
                      <svg 
                        height="1em"
                        width="1em"
                        viewBox="0 0 24 24"
                        style={{ verticalAlign: 'middle' }}
                      >
                        <path
                          fill="currentColor"
                          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                        />
                      </svg>
                      {" "}github.com/nowarp
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
