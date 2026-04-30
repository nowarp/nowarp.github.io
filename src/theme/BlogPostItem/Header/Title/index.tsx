import React from 'react';
import clsx from 'clsx';
import Title from '@theme-original/BlogPostItem/Header/Title';
import type TitleType from '@theme/BlogPostItem/Header/Title';
import type {WrapperProps} from '@docusaurus/types';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

type Props = WrapperProps<typeof TitleType>;

export default function TitleWrapper(props: Props): JSX.Element {
  const {isBlogPostPage, metadata, frontMatter} = useBlogPost();
  const splitEnabled =
    (frontMatter as {splitTitle?: boolean}).splitTitle !== false;

  if (splitEnabled) {
    const title = metadata.title;
    const colonIdx = title.indexOf(':');
    if (colonIdx > 0 && colonIdx < title.length - 1) {
      const main = title.slice(0, colonIdx).trim();
      const secondary = title.slice(colonIdx + 1).trim();
      const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
      const body = (
        <>
          <span className={styles.main}>{main}</span>
          <span className={styles.secondary}>{secondary}</span>
        </>
      );
      return (
        <TitleHeading
          className={clsx(
            styles.title,
            isBlogPostPage && styles.titlePost,
            props.className,
          )}>
          {isBlogPostPage ? (
            body
          ) : (
            <Link to={metadata.permalink} className={styles.link}>
              {body}
            </Link>
          )}
        </TitleHeading>
      );
    }
  }

  return <Title {...props} />;
}
