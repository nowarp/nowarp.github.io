import React from 'react';
import Link from '@docusaurus/Link';

export default function DetectorLink({ name, children }) {
  const displayText = children || name;
  const url = `https://nowarp.io/tools/misti/docs/next/detectors/${name}/`;
  return (
    <b><Link to={url}>{displayText}</Link></b>
  );
}
