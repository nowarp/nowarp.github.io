import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import { FaTelegramPlane, FaEnvelope, FaLock, FaChevronDown, FaShieldAlt, FaSearch, FaBug, FaArrowUp } from 'react-icons/fa';
import { SiOpensourceinitiative } from 'react-icons/si';
import { useLocation } from '@docusaurus/router';
import '../css/custom.css';

import compilerTestingPart2Cover from '@site/blog/img/2026-05-01-lean-den.png';
import compilerTestingCover from '@site/blog/img/2026-04-17-metamut-scheme.png';
import skryCover from '@site/blog/img/2026-01-17-pipeline.png';

const LATEST_POSTS = [
  {
    href: '/blog/compiler-testing-part-2',
    cover: compilerTestingPart2Cover,
    tag: 'Compilers · Metamorphic Testing',
    title: 'Compiler Testing — Part 2: Metamorphic Testing with Verified Identities',
    excerpt:
      'Hunting compiler miscompilations with differential and metamorphic testing, using mutations proven equivalence-preserving in Lean4. Real-world findings, some rewarded with bug bounties.',
  },
  {
    href: '/blog/compiler-testing-part-1',
    cover: compilerTestingCover,
    tag: 'Fuzzing · Compilers',
    title: 'Compiler Testing — Part 1: Coverage-Guided Fuzzing with Grammars and LLMs',
    excerpt:
      'How coverage-guided fuzzing and LLM-assisted mutators adapt to smart-contract compilers. 100+ bugs found across Sui Move, Cairo, Solang, Solidity, and Leo.',
  },
  {
    href: '/blog/skry',
    cover: skryCover,
    tag: 'Static Analysis · LLM',
    title: 'Skry: Hybrid LLM Static Analysis for Sui Move',
    excerpt:
      'A hybrid static analysis + LLM security tool for Sui Move, focused on access control, governance, and centralization issues.',
  },
];

type ToolLicense = 'open' | 'closed';

interface Tool {
  icon: React.ReactNode;
  name: string;
  tagline: string;
  license: ToolLicense;
  details: React.ReactNode;
}

const TOOLS: Tool[] = [
  {
    icon: <FaShieldAlt />,
    name: 'Misti',
    tagline: 'Static analyzer for TON smart contracts',
    license: 'open',
    details: (
      <>
        Static analyzer that finds security vulnerabilities, <a href="https://ton.org">TON</a>-specific pitfalls,
        and optimization opportunities in smart contracts. Fully automatic, open-source,
        and extensible for third-party security researchers.{' '}
        <a href="/tools/misti" className={styles.inlineLink}>Learn how it works and try it yourself.</a>
      </>
    ),
  },
  {
    icon: <FaSearch />,
    name: 'TON Scanner',
    tagline: 'Mass-scaner over verified TON contracts',
    license: 'closed',
    details: (
      <>
        Web-interface to the demo version of mass-scan that runs code analysis over contracts publicly available on{' '}
        <a href="https://verifier.ton.org" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          verifier.ton.org
        </a> and{' '}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          GitHub
        </a>. Only a couple of these contracts are displayed - manually verified projects that
        don't contain any vulnerabilities.{' '}
        <a href="/tools/scanner" className={styles.inlineLink}>Try the scanner.</a>
      </>
    ),
  },
  {
    icon: <FaBug />,
    name: 'Laron',
    tagline: 'Metamorphic compiler fuzzer with Lean4-verified mutations',
    license: 'closed',
    details: (
      <>
        Differential and metamorphic testing framework for smart-contract compilers, built around mutations
        proven equivalence-preserving in Lean4. Over 1600 verified identities stack together to reach
        miscompilation corner cases other fuzzers miss, with real-world findings.{' '}
        <a href="https://nowarp.io/blog/compiler-testing-part-2/" className={styles.inlineLink}>
          Read the approach overview.
        </a>
      </>
    ),
  },
];

const LicenseBadge: React.FC<{ license: ToolLicense }> = ({ license }) =>
  license === 'open' ? (
    <span className={styles.licenseBadge} title="Open source">
      <SiOpensourceinitiative /> Open source
    </span>
  ) : (
    <span className={styles.licenseBadge} title="Proprietary">
      <FaLock /> Proprietary
    </span>
  );

// Expand modeled on blog/components/Spoiler.js
const ToolEntry: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.toolEntry}>
      <div className={styles.toolHeader}>
        <h3 className={styles.toolTitle}>
          <span className={styles.toolIcon} aria-hidden="true">{tool.icon}</span>
          {tool.name}
        </h3>
        <LicenseBadge license={tool.license} />
      </div>
      <div
        className={styles.toolExpandRow}
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        <span className={styles.toolTagline}>{tool.tagline}</span>
        <FaChevronDown
          className={open ? `${styles.toolToggleIcon} ${styles.toolToggleIconOpen}` : styles.toolToggleIcon}
        />
      </div>
      {open && <div className={styles.collapsibleContent}>{tool.details}</div>}
    </div>
  );
};

const HomePage: React.FC = () => {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const scrollTopRef = useRef<() => void>(() => {});

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

  // Snap the hero <-> content boundary (index page only). JS drives both wheel
  // and keys so it actually fires in Firefox; one gesture = full commit, no half
  // state. Deep in the content it does nothing -> free native scroll.
  useEffect(() => {
    const content = document.getElementById('content-start');
    if (!content) return;

    document.documentElement.classList.add('index-snap');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navH = () => {
      const n = document.querySelector('.navbar');
      return n ? n.getBoundingClientRect().height : 60;
    };
    // land just below the sticky navbar, with a little breathing room
    const contentTop = () => content.getBoundingClientRect().top + window.scrollY - navH() - 16;

    let locked = false;
    let rafId = 0;
    // rAF tween: animates even in Firefox with smooth-scroll turned off
    // (scrollTo's "smooth" obeys that setting; painting scrollTop ourselves bypasses it).
    const go = (to: number) => {
      cancelAnimationFrame(rafId);
      if (reduce) { window.scrollTo(0, to); return; } // honor prefers-reduced-motion
      locked = true;
      const from = window.scrollY;
      const dist = to - from;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
      let t0 = 0;
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / 500, 1);
        window.scrollTo(0, from + dist * ease(p));
        if (p < 1) rafId = requestAnimationFrame(step);
        else locked = false;
      };
      rafId = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (locked) { e.preventDefault(); return; }
      const y = window.scrollY;
      const cTop = contentTop();
      if (e.deltaY > 0 && y < cTop - 5) { e.preventDefault(); go(cTop); }
      else if (e.deltaY < 0 && y > 5 && y <= cTop + 5) { e.preventDefault(); go(0); }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (locked || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      const y = window.scrollY;
      const cTop = contentTop();
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && y < cTop - 5) { e.preventDefault(); go(cTop); }
      else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && y > 5 && y <= cTop + 5) { e.preventDefault(); go(0); }
    };

    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    scrollTopRef.current = () => go(0);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('index-snap');
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>nowarp - Web3 Security</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nowarp.io/" />
        <meta property="og:title" content="nowarp - Web3 Security" />
        <meta
          property="og:description"
          content="A holistic approach to protocol security — we audit your contracts and everything they rely on, across Ethereum, Move, and TON."
        />
      </Head>

      {showTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          className={styles.toTop}
          onClick={() => scrollTopRef.current()}
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      )}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroWordmark}>no&nbsp;warp<span className={styles.heroAccent}>.</span></h1>
          <div className={styles.heroTagline}>What you write is what runs.</div>
          <p className={styles.heroLede}>A holistic approach to protocol security — we audit your contracts and everything they rely on, across Ethereum, Move, and TON.</p>
          <div className={styles.heroCtas}>
            <a href="#audits" className={styles.heroBtnPrimary}>Request an audit</a>
            <a href="#tools" className={styles.heroBtnSecondary}>Explore the tools</a>
          </div>
          <div className={styles.heroCols}>
            <a href="#tools" className={styles.heroCol}>
              <div className={styles.heroColTitle}>Tooling</div>
              <div className={styles.heroColDesc}>Static analysis, fuzzing, compiler testing, AI.</div>
            </a>
            <a href="#audits" className={styles.heroCol}>
              <div className={styles.heroColTitle}>Audits</div>
              <div className={styles.heroColDesc}>Protocols, end to end.</div>
            </a>
            <a href="#blog" className={styles.heroCol}>
              <div className={styles.heroColTitle}>Research</div>
              <div className={styles.heroColDesc}>Approaches, insights, findings.</div>
            </a>
          </div>
        </div>
      </section>

      <main id="content-start" style={{ marginTop: '1rem' }}>
        {/* Container 1: Tools */}
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div className={styles.featureBox}>
            <section id="tools" className={styles.features}>
              <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Security Tools</h2>
              {TOOLS.map((tool) => (
                <ToolEntry key={tool.name} tool={tool} />
              ))}
            </section>
          </div>
        </div>

        {/* Container 2: Audits */}
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div className={styles.featureBox}>
            <section id="audits" className={styles.features}>
              <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Security Audits</h2>

              <div className="row">
                <div className="col col--12">
                  <ul className={styles.auditList}>
                    <li>
                      Smart contracts
                      <span className={styles.auditItemDesc}>Across Ethereum, Move and TON. Non-trivial protocols only.</span>
                    </li>
                    <li>
                      Compiler / toolchain / runtime
                      <span className={styles.auditItemDesc}>Security across the layers beneath the contract.</span>
                    </li>
                  </ul>
                  <p className={styles.auditProse} style={{ marginBottom: 0 }}>
                    The <a href="#tools" className={styles.inlineLink}>tools we've built</a> and the{' '}
                    <a href="/blog" className={styles.inlineLink}>blog</a> carry our findings and insights. Previous audit reports on request.
                  </p>
                </div>
              </div>

              <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col col--12">
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

        {/* Container 3: Latest blog posts */}
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div className={styles.featureBox}>
            <section id="blog" className={styles.features}>
              <div className={styles.blogHeader}>
                <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: 0 }}>Latest Posts</h2>
                <a href="/blog" className={styles.blogAllLink}>All posts →</a>
              </div>
              <div className={styles.blogGrid}>
                {LATEST_POSTS.map((post) => (
                  <a key={post.href} href={post.href} className={styles.blogCard}>
                    <div
                      className={styles.blogCardImage}
                      style={{ backgroundImage: `url(${post.cover})` }}
                      role="img"
                      aria-label={post.title}
                    />
                    <div className={styles.blogCardContent}>
                      <span className={styles.blogCardTag}>{post.tag}</span>
                      <h3 className={styles.blogCardTitle}>{post.title}</h3>
                      <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
