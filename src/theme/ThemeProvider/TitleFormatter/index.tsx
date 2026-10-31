import React, { type ComponentProps, type ReactNode } from 'react';
import { TitleFormatterProvider } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/ThemeProvider/TitleFormatter';

type F = ComponentProps<typeof TitleFormatterProvider>['formatter'];

const f: F = ({ title: t, siteTitle: s, titleDelimiter: d }) => {
  const x = t?.trim();
  return !x || x === s ? s : `${s} ${d} ${x}`;
};

export default function P({ children: c }: Props): ReactNode {
  return <TitleFormatterProvider formatter={f}>{c}</TitleFormatterProvider>;
}
