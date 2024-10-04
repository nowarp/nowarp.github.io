---
id: detectors
title: Detectors Overview
sidebar_label: Detectors Overview
---

# Detectors Overview

Misti currently supports 19 detectors designed to identify specific code issues, detect vulnerabilities, and enforce best practices:

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
| 9  | [FieldDoubleInit](./detectors/FieldDoubleInit.md) | Medium |  | ✔ |
| 10  | [InheritedStateMutation](./detectors/InheritedStateMutation.md) | Low |  |  |
| 11  | [NeverAccessedVariables](./detectors/NeverAccessedVariables.md) | Medium |  | ✔ |
| 12  | [OptimalMathFunction](./detectors/OptimalMathFunction.md) | Low |  | ✔ |
| 13  | [PreferAugmentedAssign](./detectors/PreferAugmentedAssign.md) | Info |  | ✔ |
| 14  | [PreferredStdlibApi](./detectors/PreferredStdlibApi.md) | Info |  |  |
| 15  | [ReadOnlyVariables](./detectors/ReadOnlyVariables.md) | Medium | ✔ | ✔ |
| 16  | [StringReceiversOverlap](./detectors/StringReceiversOverlap.md) | High |  | ✔ |
| 17  | [UnboundLoops](./detectors/UnboundLoops.md) | High | ✔ | ✔ |
| 18  | [UnusedOptional](./detectors/UnusedOptional.md) | Low |  | ✔ |
| 19  | [ZeroAddress](./detectors/ZeroAddress.md) | Low |  | ✔ |

Some of the detectors require [Soufflé](https://souffle-lang.github.io/install) to be installed. If no Soufflé installation is found, these detectors won't be executed.

A few detectors are optional and aimed at auditors to help uncover subtle issues in the source code. To enable all detectors, use the `--all-detectors` option. You can find a full list of configuration options on the [configuration page](./tutorial/configuration.md).

Each detector targets a specific type of problem in your code. Click on the detector name to learn more.
