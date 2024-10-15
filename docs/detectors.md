---
id: detectors
title: Detectors Overview
---

# Detectors Overview

Misti currently supports 20 detectors designed to identify specific code issues, detect vulnerabilities, and enforce best practices:

| #  | Detector | Severity | Requires Soufflé | Enabled by default |
|----|-----------|-----------|--------------------|---------------------|
| 1  | [ArgCopyMutation](./detectors/ArgCopyMutation.md) | High |  | ✔ |
| 2  | [AsmIsUsed](./detectors/AsmIsUsed.md) | Info |  |  |
| 3  | [BranchDuplicate](./detectors/BranchDuplicate.md) | High |  | ✔ |
| 4  | [ConstantAddress](./detectors/ConstantAddress.md) | Info |  |  |
| 5  | [DivideBeforeMultiply](./detectors/DivideBeforeMultiply.md) | High | ✔ | ✔ |
| 6  | [DumpIsUsed](./detectors/DumpIsUsed.md) | Info |  |  |
| 7  | [DuplicatedCondition](./detectors/DuplicatedCondition.md) | High |  | ✔ |
| 8  | [EnsurePrgSeed](./detectors/EnsurePrgSeed.md) | Medium |  | ✔ |
| 9  | [FalseCondition](./detectors/FalseCondition.md) | Medium |  | ✔ |
| 10  | [FieldDoubleInit](./detectors/FieldDoubleInit.md) | Medium |  | ✔ |
| 11  | [InheritedStateMutation](./detectors/InheritedStateMutation.md) | Low |  |  |
| 12  | [NeverAccessedVariables](./detectors/NeverAccessedVariables.md) | Medium |  | ✔ |
| 13  | [OptimalMathFunction](./detectors/OptimalMathFunction.md) | Low |  | ✔ |
| 14  | [PreferAugmentedAssign](./detectors/PreferAugmentedAssign.md) | Info |  | ✔ |
| 15  | [PreferredStdlibApi](./detectors/PreferredStdlibApi.md) | Info |  |  |
| 16  | [ReadOnlyVariables](./detectors/ReadOnlyVariables.md) | Medium | ✔ | ✔ |
| 17  | [StringReceiversOverlap](./detectors/StringReceiversOverlap.md) | High |  | ✔ |
| 18  | [UnboundLoops](./detectors/UnboundLoops.md) | High | ✔ | ✔ |
| 19  | [UnusedOptional](./detectors/UnusedOptional.md) | Low |  | ✔ |
| 20  | [ZeroAddress](./detectors/ZeroAddress.md) | Low |  | ✔ |

Some of the detectors require [Soufflé](https://souffle-lang.github.io/install) to be installed. If no Soufflé installation is found, these detectors won't be executed.

A few detectors are optional and aimed at auditors to help uncover subtle issues in the source code. To enable all detectors, use the `--all-detectors` option. You can find a full list of configuration options on the [configuration page](./tutorial/configuration.md).

Each detector targets a specific type of problem in your code. Click on the detector name to learn more.
