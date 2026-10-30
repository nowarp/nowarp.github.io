import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import { FaTelegramPlane, FaEnvelope, FaLock, FaChevronDown } from 'react-icons/fa';
import { SiOpensourceinitiative } from 'react-icons/si';
import MistiIcon from '@site/static/img/tools/misti.svg';
import ScannerIcon from '@site/static/img/tools/scanner.svg';
import LaronIcon from '@site/static/img/tools/laron.svg';
import ContractIcon from '@site/static/img/audits/contract.svg';
import BaseIcon from '@site/static/img/audits/base.svg';
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
    icon: <MistiIcon />,
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
    icon: <ScannerIcon />,
    name: 'TON Scanner',
    tagline: 'Mass-scanner over verified TON contracts',
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
    icon: <LaronIcon />,
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

interface Audit {
  icon: React.ReactNode;
  name: string;
  meta: string;
  tagline: string;
}

const AUDITS: Audit[] = [
  {
    icon: <ContractIcon />,
    name: 'Smart contracts',
    meta: 'Ethereum · Move · TON',
    tagline: 'Non-trivial protocols only.',
  },
  {
    icon: <BaseIcon />,
    name: 'Trusted base',
    meta: 'compiler · toolchain · runtime',
    tagline: 'The layers beneath the contract.',
  },
];

const AuditEntry: React.FC<{ audit: Audit }> = ({ audit }) => (
  <div className={styles.toolEntry}>
    <div className={styles.toolHeader}>
      <h3 className={styles.toolTitle}>
        <span className={styles.toolIcon} aria-hidden="true">{audit.icon}</span>
        {audit.name}
      </h3>
      <span className={styles.auditMeta}>{audit.meta}</span>
    </div>
    <div className={clsx(styles.toolTagline, styles.auditTagline)}>{audit.tagline}</div>
  </div>
);

type Tok = [string, 'p' | 's' | 'n' | 'm' | 'f'];

const C = [110, 111, 119, 97, 114, 112];

const E: Tok[][] = [
  [['"no"', 's'], [' ^ ', 'p'], ['"warp"', 's'], [';;', 'p']],
  [
    ['[', 'p'],
    ...C.flatMap((c, j): Tok[] => [[String(c), 'n'], [j < C.length - 1 ? '; ' : ']', 'p']]),
    [' |> ', 'p'], ['List', 'm'], ['.map ', 'f'], ['Char', 'm'], ['.chr', 'f'],
    [' |> ', 'p'], ['List', 'm'], ['.to_seq', 'f'],
    [' |> ', 'p'], ['String', 'm'], ['.of_seq', 'f'], [';;', 'p'],
  ],
  [['String', 'm'], ['.concat ', 'f'], ['""', 's'], [' [', 'p'], ['"no"', 's'], ['; ', 'p'], ['"warp"', 's'], ['];;', 'p']],
  [['String', 'm'], ['.lowercase_ascii ', 'f'], ['"NOWARP"', 's'], [';;', 'p']],
  [['Printf', 'm'], ['.sprintf ', 'f'], ['"%s%s"', 's'], [' ', 'p'], ['"no"', 's'], [' ', 'p'], ['"warp"', 's'], [';;', 'p']],
];

const X: Tok[] = [['let ', 'm'], ['s', 'f'], [' = ', 'p'], ['Marshal', 'm'], ['.to_string ', 'f'], ['"nowarp"', 's'], [' []', 'p'], [';;', 'p']];

const D: Tok[] = [['$ ', 'p']];
const B: Tok[] = [['(gdb) ', 'p']];
const Z: Tok[] = [];

const G: [Tok[], Tok[], number][] = [
  [[['val ', 'm'], ['s', 'f'], [' : ', 'p'], ['string', 'm'], [' =', 'p']], Z, 150],
  [[['  "����\\000\\000\\000\\007\\000\\000\\000\\001\\000\\000\\000\\003\\000\\000\\000\\002&nowarp"', 's']], Z, 1400],
  [[['# ', 'p']], [['(', 'p'], ['Marshal', 'm'], ['.from_string ', 'f'], ['s ', 'f'], ['0', 'n'], [' : ', 'p'], ['string array', 'm'], [');;', 'p']], 350],
  [[['Segmentation fault (core dumped)', 'f']], Z, 1400],
  [D, [['ocaml -version', 'f']], 300],
  [[['The OCaml toplevel, version 5.4.1', 'f']], Z, 1400],
  [D, [['gdb -q $(which ocamlrun) core.957329', 'f']], 900],
  [[['Program terminated with signal SIGSEGV, Segmentation fault.', 'f']], Z, 400],
  [[['#0  ', 'p'], ['Hd_val', 'f'], [' (val=', 'p'], ['72181230601727854', 'n'], [') at ', 'p'], ['runtime/caml/mlvalues.h:190', 'm']], Z, 1700],
  [B, [['up', 'f']], 300],
  [[['#1  ', 'p'], ['caml_ml_string_length', 'f'], [' (s=', 'p'], ['72181230601727854', 'n'], [') at ', 'p'], ['runtime/str.c:43', 'm']], Z, 1700],
  [B, [['x/i $pc', 'f']], 300],
  [[['=> ', 'p'], ['0x55b09b2add70', 'n'], [' <caml_ml_string_length>:\t', 'p'], ['mov    rax,QWORD PTR [rdi-0x8]', 'f']], Z, 2000],
  [B, [['p/x $rdi', 'f']], 300],
  [[['$1 = ', 'p'], ['0x100707261776f6e', 'n']], Z, 1500],
  [B, [['p (char[8])$rdi', 'f']], 300],
  [[['$2 = ', 'p'], ['"nowarp\\000\\001"', 's']], Z, 2600],
  [B, [['q', 'f']], 300],
  [D, [['ocaml', 'f']], 400],
  [[['OCaml version 5.4.1', 'p']], Z, 1500],
];

const len = (e: Tok[]) => e.reduce((a, [s]) => a + s.length, 0);

const sl = (e: Tok[], n: number) => {
  const r: Tok[] = [];
  for (const [s, k] of e) {
    if (n <= 0) break;
    r.push([s.slice(0, n), k]);
    n -= s.length;
  }
  return r;
};

const cut = (e: Tok[], n: number) => sl(e, n).map(([s, k], j) => <span key={j} className={styles[k]}>{s}</span>);

const Repl: React.FC = () => {
  const [e, setE] = useState(E[0]);
  const [n, setN] = useState(len(E[0]));
  const [o, setO] = useState(true);
  const [m, setM] = useState(-1);
  const [g, setG] = useState<[Tok[], Tok[], boolean] | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let d = false;
    let t: ReturnType<typeof setTimeout>;
    const w = (ms: number) => new Promise<void>((r) => { t = setTimeout(r, ms); });
    const y = async (v: Tok[]) => {
      setE(v);
      setO(false);
      await w(400);
      for (let j = 1; j <= len(v) && !d; j++) { setN(j); await w(30 + Math.random() * 45); }
      await w(350);
    };
    (async () => {
      let k = 0;
      let c = 0;
      await w(2500);
      while (!d) {
        for (let j = len(E[k]); j >= 0 && !d; j--) { setN(j); await w(10); }
        if (++c > 20 && Math.random() < 0.1) {
          await y(X);
          let a: Tok[] = [['# ', 'p'], ...X];
          for (const [p, s, h] of G) {
            if (d) break;
            let b = p;
            if (s.length) {
              for (let j = 0; j <= len(s) && !d; j++) {
                b = [...p, ...sl(s, j)];
                setG([a, b, true]);
                await w(j ? 40 + Math.random() * 60 : 500);
              }
            } else {
              setG([a, b, false]);
            }
            a = b;
            await w(h);
          }
          setN(0);
          setG(null);
        }
        k = (k + 1) % E.length;
        await y(E[k]);
        setO(true);
        if (k === 1) {
          setM(0);
          await w(900);
          for (let j = 1; j <= C.length && !d; j++) { setM(j); await w(170); }
          await w(250);
          setM(-1);
        }
        await w(3200);
      }
    })();
    return () => { d = true; clearTimeout(t); };
  }, []);

  const q = (b: string) => (
    <span className={styles.slot}>
      <span className={clsx(styles.p, m >= 0 && styles.on)}>{m >= 0 && b}</span>
      <span className={clsx(styles.p, m < 0 && styles.on)}>"</span>
    </span>
  );

  return (
    <div className={styles.repl}>
      <div className={styles.in} aria-hidden="true">
        {g ? cut(g[0], Infinity) : (
          <>
            <span className={styles.p}># </span>
            {cut(e, n)}
            <span className={styles.cursor} />
          </>
        )}
      </div>
      <h1 className={clsx(styles.out, (o || g) && styles.lit)} aria-label="nowarp">
        {g ? (
          <>
            {cut(g[1], Infinity)}
            {g[2] && <span className={styles.cursor} />}
          </>
        ) : (
          <>
            <span className={styles.p}>- : </span>
            <span className={styles.m}>string</span>
            <span className={styles.p}> = </span>
            {q('[')}
            {C.map((c, j) => {
              const x = m >= 0 && j >= m;
              const s = j < C.length - 1 ? '; ' : '';
              return (
                <span key={c} className={styles.slot} style={{ width: `${x ? String(c).length + s.length : 1}ch` }}>
                  <span className={clsx(styles.n, x && styles.on)}>{m >= 0 && `${c}${s}`}</span>
                  <span className={clsx(styles.ch, !x && styles.on)}>{String.fromCharCode(c)}</span>
                </span>
              );
            })}
            {q(']')}
          </>
        )}
      </h1>
    </div>
  );
};

const HomePage: React.FC = () => {
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

  return (
    <Layout>
      <Head>
        <title>nowarp</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nowarp.io/" />
        <meta property="og:title" content="nowarp" />
        <meta
          property="og:description"
          content="A holistic approach to protocol security — we audit your contracts and everything they rely on, across Ethereum, Move, and TON."
        />
      </Head>

      <main className={clsx('container', styles.cards)}>
        <Repl />
        <div className={styles.row}>
          <section id="tools" className={clsx(styles.featureBox, styles.card)}>
            <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Security Tools</h2>
            {TOOLS.map((tool) => (
              <ToolEntry key={tool.name} tool={tool} />
            ))}
          </section>

          <section id="audits" className={clsx(styles.featureBox, styles.card)}>
            <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: '1.5rem' }}>Services</h2>
            <div className={styles.auditRows}>
              {AUDITS.map((audit) => (
                <AuditEntry key={audit.name} audit={audit} />
              ))}
            </div>
            <div className={styles.auditCta}>
              <span className={styles.auditLabel}>Scope</span>
              <span className={styles.auditValue}>security audits · security tooling development</span>
              <span className={styles.auditLabel}>Contacts</span>
              <span className={clsx(styles.auditValue, styles.auditLinks)}>
                <a href="mailto:oi@nowarp.io?subject=Audit%20request">
                  <FaEnvelope /> oi@nowarp.io
                </a>
                <span>·</span>
                <a href="https://t.me/jubnzv">
                  <FaTelegramPlane /> @jubnzv
                </a>
              </span>
            </div>
          </section>
        </div>

        <section id="blog" className={clsx(styles.featureBox, styles.card, styles.posts)}>
          <div className={styles.blogHeader}>
            <h2 className={styles.featuresTitle} style={{ marginTop: 0, marginBottom: 0 }}>Latest Posts</h2>
            <a href="/blog" className={styles.blogAllLink}>All posts →</a>
          </div>
          <div className={styles.blogGrid}>
            {LATEST_POSTS.map((post) => (
              <a key={post.href} href={post.href} className={styles.blogCard}>
                <div className={styles.blogCardImage}>
                  <img src={post.cover} alt={post.title} loading="lazy" />
                </div>
                <div className={styles.blogCardContent}>
                  <span className={styles.blogCardTag}>{post.tag}</span>
                  <h3 className={styles.blogCardTitle}>{post.title}</h3>
                  <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
