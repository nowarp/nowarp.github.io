import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Detectors',
      items: [
        {
          type: 'doc',
          id: 'detectors/divideBeforeMultiply',
          label: 'Divide before Multiply',
        },
        {
          type: 'doc',
          id: 'detectors/neverAccessedVariables',
          label: 'Never-accessed Variables',
        },
        {
          type: 'doc',
          id: 'detectors/readOnlyVariables',
          label: 'Read-only Variables',
        },
        {
          type: 'doc',
          id: 'detectors/unboundLoops',
          label: 'Unbound Loops',
        },
        {
          type: 'doc',
          id: 'detectors/zeroAddress',
          label: 'Zero Address',
        }
      ],
    },
  ],
};

export default sidebars;
