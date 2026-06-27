// Ejected from @theme/BlogPostItem/Footer -- adds an "Announced on" row between
// the tags row and the edit row, matching the footer's margin-top--sm rhythm.
import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXTwitter, faLinkedin, faTelegram} from '@fortawesome/free-brands-svg-icons';
import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export default function BlogPostItemFooter(): JSX.Element | null {
  const {metadata, isBlogPostPage, frontMatter} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;

  const fm = frontMatter as {
    announce_x?: string;
    announce_linkedin?: string;
    announce_telegram?: string;
  };
  const announces = [
    {label: 'X', url: fm.announce_x, icon: faXTwitter},
    {label: 'LinkedIn', url: fm.announce_linkedin, icon: faLinkedin},
    {label: 'Telegram', url: fm.announce_telegram, icon: faTelegram},
  ].filter(
    (a): a is {label: string; url: string; icon: IconDefinition} =>
      Boolean(a.url),
  );
  const announcesExist = isBlogPostPage && announces.length > 0;

  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl || announcesExist;
  if (!renderFooter) {
    return null;
  }

  // BlogPost footer - details view
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

    return (
      <footer className="docusaurus-mt-lg">
        {tagsExists && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {announcesExist && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <strong>Announced on:</strong>{' '}
              {announces.map((a, i) => (
                <React.Fragment key={a.url}>
                  {i > 0 && ' · '}
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={a.label}
                    aria-label={a.label}>
                    <FontAwesomeIcon icon={a.icon} />
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    );
  }
  // BlogPost footer - list view
  return (
    <footer className="row docusaurus-mt-lg">
      {tagsExists && (
        <div className={clsx('col', {'col--9': truncatedPost})}>
          <TagsListInline tags={tags} />
        </div>
      )}
      {truncatedPost && (
        <div
          className={clsx('col text--right', {
            'col--3': tagsExists,
          })}>
          <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
        </div>
      )}
    </footer>
  );
}
