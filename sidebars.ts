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
      label: 'Tutorial',
      items: [
        {
          type: 'doc',
          id: 'tutorial/install',
          label: 'Installation',
        },
        {
          type: 'doc',
          id: 'tutorial/quickstart',
          label: 'Quick Start',
        },
        {
          type: 'doc',
          id: 'tutorial/configuration',
          label: 'Configuration',
        },
      ],
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
    {
      type: 'category',
      label: 'Hacking',
      items: [
        {
          type: 'doc',
          id: 'hacking/contributing',
          label: 'Contributing',
        },
        {
          type: 'doc',
          id: 'hacking/design',
          label: 'Design Overview',
        },
        {
          type: 'doc',
          id: 'hacking/tools',
          label: 'Tools',
        },
        {
          type: 'doc',
          id: 'hacking/custom-detector',
          label: 'Custom Detectors',
        },
      ],
    },
  ],
};

export default sidebars;
