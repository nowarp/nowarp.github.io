---
id: detectors
title: Detectors Overview
sidebar_label: Detectors Overview
---

# Detectors Overview

Misti currently supports 15 detectors designed to identify specific code issues, detect vulnerabilities, and enforce best practices:

| #  | Detector                                                        | Requires Soufflé | Enabled by default |
|----|-----------------------------------------------------------------|------------------|--------------------|
| 1  | [ArgCopyMutation](./detectors/ArgCopyMutation.md)               |                  | ✔                  |
| 2  | [AsmIsUsed](./detectors/AsmIsUsed.md)                           |                  |                    |
| 3  | [BranchDuplicate](./detectors/BranchDuplicate.md)               |                  | ✔                  |
| 4  | [ConstantAddress](./detectors/ConstantAddress.md)               |                  |                    |
| 5  | [DivideBeforeMultiply](./detectors/DivideBeforeMultiply.md)     | ✔                | ✔                  |
| 6  | [DumpIsUsed](./detectors/DumpIsUsed.md)                         |                  |                    |
| 7  | [FieldDoubleInit](./detectors/FieldDoubleInit.md)               |                  | ✔                  |
| 8  | [InheritedStateMutation](./detectors/InheritedStateMutation.md) |                  |                    |
| 9  | [NeverAccessedVariables](./detectors/NeverAccessedVariables.md) |                  | ✔                  |
| 10 | [PreferAugmentedAssign](./detectors/PreferAugmentedAssign.md)   |                  | ✔                  |
| 11 | [PreferredStdlibApi](./detectors/PreferredStdlibApi.md)         |                  |                    |
| 12 | [ReadOnlyVariables](./detectors/ReadOnlyVariables.md)           | ✔                | ✔                  |
| 13 | [StringReceiversOverlap](./detectors/StringReceiversOverlap.md) |                  | ✔                  |
| 14 | [UnboundLoops](./detectors/UnboundLoops.md)                     | ✔                | ✔                  |
| 15 | [ZeroAddress](./detectors/ZeroAddress.md)                       |                  | ✔                  |

Some of the detectors require [Soufflé](https://souffle-lang.github.io/install) to be installed. If no Soufflé installation is found, these detectors won't be executed.

A few detectors are optional and aimed at auditors to help uncover subtle issues in the source code. To enable all detectors, use the `--all-detectors` option. You can find a full list of configuration options on the [configuration page](./tutorial/configuration.md).

Each detector targets a specific type of problem in your code. Click on the detector name to learn more.
