import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import Logo from '@theme-original/Logo';
import type { Props } from '@theme/Logo';
import M from '@site/static/img/tools/misti.svg';
import S from '@site/static/img/tools/scanner.svg';

const T = [
  ['/tools/misti', M, 'Misti'],
  ['/tools/scanner', S, 'Scanner'],
] as const;

export default function W(p: Props): ReactNode {
  const { pathname: u } = useLocation();
  const t = T.find(([r]) => u === r || u.startsWith(`${r}/`));
  if (!t) return <Logo {...p} />;
  const [, G, a] = t;
  const { imageClassName: c, titleClassName: _, ...q } = p;
  return (
    <Link to="/" {...q}>
      <div className={c}>
        <G role="img" aria-label={a} />
      </div>
    </Link>
  );
}
