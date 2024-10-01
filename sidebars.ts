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
          id: 'tutorial/cli',
          label: 'Command-Line Interface',
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
          id: 'detectors/ArgCopyMutation',
          label: 'ArgCopyMutation',
        },
        {
          type: 'doc',
          id: 'detectors/AsmIsUsed',
          label: 'AsmIsUsed',
        },
        {
          type: 'doc',
          id: 'detectors/BranchDuplicate',
          label: 'BranchDuplicate',
        },
        {
          type: 'doc',
          id: 'detectors/ConstantAddress',
          label: 'ConstantAddress',
        },
        {
          type: 'doc',
          id: 'detectors/DivideBeforeMultiply',
          label: 'DivideBeforeMultiply',
        },
        {
          type: "doc",
          id: "detectors/DumpIsUsed",
          label: "DumpIsUsed"
        },
        {
          type: "doc",
          id: "detectors/DuplicatedCondition",
          label: "DuplicatedCondition"
        },
        {
          type: "doc",
          id: "detectors/FieldDoubleInit",
          label: "FieldDoubleInit"
        },
        {
          type: "doc",
          id: "detectors/InheritedStateMutation",
          label: "InheritedStateMutation"
        },
        {
          type: 'doc',
          id: 'detectors/NeverAccessedVariables',
          label: 'NeverAccessedVariables',
        },
        {
          type: "doc",
          id: "detectors/OptimalMathFunction",
          label: "OptimalMathFunction"
        },
        {
          type: "doc",
          id: "detectors/PreferAugmentedAssign",
          label: "PreferAugmentedAssign"
        },
        {
          type: "doc",
          id: "detectors/PreferredStdlibApi",
          label: "PreferredStdlibApi"
        },
        {
          type: 'doc',
          id: 'detectors/ReadOnlyVariables',
          label: 'ReadOnlyVariables',
        },
        {
          type: "doc",
          id: "detectors/StringReceiversOverlap",
          label: "StringReceiversOverlap"
        },
        {
          type: 'doc',
          id: 'detectors/UnboundLoops',
          label: 'UnboundLoops',
        },
        {
          type: 'doc',
          id: 'detectors/ZeroAddress',
          label: 'ZeroAddress',
        },
      ],
    },
    {
      type: 'doc',
      id: 'tools',
      label: 'Tools Overview',
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        {
          type: 'doc',
          id: 'tools/DumpAst',
          label: 'DumpAst',
        },
        {
          type: 'doc',
          id: 'tools/DumpCfg',
          label: 'DumpCfg',
        },
        {
          type: 'doc',
          id: 'tools/DumpConfig',
          label: 'DumpConfig',
        }
      ]
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
          id: 'hacking/custom-detector',
          label: 'Custom Detectors',
        },
      ],
    },
  ],
};

export default sidebars;
