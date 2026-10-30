import React from 'react';
import clsx from 'clsx';
import Title from '@theme/BlogPostItem/Header/Title';
import Info from '@theme/BlogPostItem/Header/Info';
import Authors from '@theme/BlogPostItem/Header/Authors';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import a from '@site/blog/img/2026-05-01-lean-den.png';
import b from '@site/blog/img/2026-04-17-metamut-scheme.png';
import c from '@site/blog/img/2026-01-17-pipeline.png';
import d from '@site/blog/img/2025-01-26-pipeline.png';
import styles from './styles.module.css';

const C: Record<string, string> = {
  '/blog/compiler-testing-part-2': a,
  '/blog/compiler-testing-part-1': b,
  '/blog/skry': c,
  '/blog/ton-security-risks': d,
};

export default function Header() {
  const {isBlogPostPage, metadata} = useBlogPost();
  const i = isBlogPostPage ? undefined : C[metadata.permalink];

  return (
    <header className={clsx(i && styles.header)}>
      {i && (
        <div className={styles.backdrop} aria-hidden="true">
          <img src={i} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <Title />
      <Info />
      <Authors />
    </header>
  );
}
