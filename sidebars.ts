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
          id: 'tutorial/ci-cd',
          label: 'CI/CD Integration',
        },
        {
          type: 'doc',
          id: 'tutorial/configuration',
          label: 'Configuration',
        },
        {
          type: 'doc',
          id: 'tutorial/blueprint',
          label: 'Using with Blueprint',
        },
      ],
    },
    {
      type: 'doc',
      id: 'detectors',
      label: 'Detectors Overview',
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
        },
        {
          type: 'doc',
          id: 'detectors/ConstantAddress',
          label: 'Constant Address',
        },
        {
          type: 'doc',
          id: 'detectors/BranchDuplicate',
          label: 'Branch Duplicate',
        },
        {
          type: "doc",
          id: "detectors/DumpIsUsed",
          label: "`dump` Is Used"
        },
        {
          type: "doc",
          id: "detectors/FieldDoubleInit",
          label: "Field Initialized Twice"
        },
        {
          type: "doc",
          id: "detectors/PreferAugmentedAssign",
          label: "Prefer Augmented Assignment"
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
      ],
    },
  ],
};

export default sidebars;
