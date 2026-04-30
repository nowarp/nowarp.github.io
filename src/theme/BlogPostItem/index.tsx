import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useColorMode} from '@docusaurus/theme-common';
import Giscus from '@giscus/react';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper(props: Props): JSX.Element {
  const {isBlogPostPage} = useBlogPost();
  const {colorMode} = useColorMode();

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && (
        <div style={{marginTop: '2rem'}}>
          <Giscus
            repo="nowarp/nowarp.github.io"
            repoId="R_kgDOMZh17Q"
            category="Announcements"
            categoryId="DIC_kwDOMZh17c4C6Ktw"
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={colorMode === 'dark' ? 'dark_tritanopia' : 'light'}
            lang="en"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
}
