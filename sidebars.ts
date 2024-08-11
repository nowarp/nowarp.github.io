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
          id: 'tutorial/getting-started',
          label: 'Getting Started',
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
          id: 'detectors/DivideBeforeMultiply',
          label: 'Divide before Multiply',
        },
        {
          type: 'doc',
          id: 'detectors/NeverAccessedVariables',
          label: 'Never-accessed Variables',
        },
        {
          type: 'doc',
          id: 'detectors/ReadOnlyVariables',
          label: 'Read-only Variables',
        },
        {
          type: 'doc',
          id: 'detectors/UnboundLoops',
          label: 'Unbound Loops',
        },
        {
          type: 'doc',
          id: 'detectors/ZeroAddress',
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
          id: 'hacking/souffle',
          label: 'Soufflé',
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
        {
          type: 'doc',
          id: 'hacking/CHANGELOG',
          label: 'CHANGELOG',
        },
      ],
    },
  ],
};

export default sidebars;
