---
id: detectors
title: Detectors Overview
---

# Detectors Overview

## Built-in Detectors

| #  | Detector | Severity | Requires Soufflé | Enabled by default |
|----|-----------|-----------|--------------------|---------------------|
| 1  | [ArgCopyMutation](./detectors/ArgCopyMutation.md) | High |  | ✔ |
| 2  | [AsmIsUsed](./detectors/AsmIsUsed.md) | Info |  |  |
| 3  | [BranchDuplicate](./detectors/BranchDuplicate.md) | High |  | ✔ |
| 4  | [CellBounds](./detectors/CellBounds.md) | Critical |  | ✔ |
| 5  | [ConstantAddress](./detectors/ConstantAddress.md) | Info |  |  |
| 6  | [DivideBeforeMultiply](./detectors/DivideBeforeMultiply.md) | High | ✔ | ✔ |
| 7  | [DumpIsUsed](./detectors/DumpIsUsed.md) | Info |  |  |
| 8  | [DuplicatedCondition](./detectors/DuplicatedCondition.md) | High |  | ✔ |
| 9  | [EnsurePrgSeed](./detectors/EnsurePrgSeed.md) | Medium |  | ✔ |
| 10  | [EtaLikeSimplifications](./detectors/EtaLikeSimplifications.md) | Low |  | ✔ |
| 11  | [ExitCodeUsage](./detectors/ExitCodeUsage.md) | High |  | ✔ |
| 12  | [FalseCondition](./detectors/FalseCondition.md) | Medium |  | ✔ |
| 13  | [FieldDoubleInit](./detectors/FieldDoubleInit.md) | Medium |  | ✔ |
| 14  | [InheritedStateMutation](./detectors/InheritedStateMutation.md) | Low |  |  |
| 15  | [NeverAccessedVariables](./detectors/NeverAccessedVariables.md) | Medium |  | ✔ |
| 16  | [OptimalMathFunction](./detectors/OptimalMathFunction.md) | Low |  | ✔ |
| 17  | [PreferAugmentedAssign](./detectors/PreferAugmentedAssign.md) | Info |  | ✔ |
| 18  | [PreferredStdlibApi](./detectors/PreferredStdlibApi.md) | Info |  |  |
| 19  | [ReadOnlyVariables](./detectors/ReadOnlyVariables.md) | Medium | ✔ | ✔ |
| 20  | [SendInLoop](./detectors/SendInLoop.md) | Medium |  |  |
| 21  | [ShortCircuitCondition](./detectors/ShortCircuitCondition.md) | Low |  | ✔ |
| 22  | [StringReceiversOverlap](./detectors/StringReceiversOverlap.md) | High |  | ✔ |
| 23  | [SuspiciousLoop](./detectors/SuspiciousLoop.md) | Medium |  | ✔ |
| 24  | [SuspiciousMessageMode](./detectors/SuspiciousMessageMode.md) | Medium |  | ✔ |
| 25  | [UnboundLoop](./detectors/UnboundLoop.md) | High | ✔ | ✔ |
| 26  | [UnboundMap](./detectors/UnboundMap.md) | Low |  |  |
| 27  | [UnprotectedCall](./detectors/UnprotectedCall.md) | High |  | ✔ |
| 28  | [UnusedExpressionResult](./detectors/UnusedExpressionResult.md) | Medium |  | ✔ |
| 29  | [UnusedOptional](./detectors/UnusedOptional.md) | Low |  | ✔ |
| 30  | [ZeroAddress](./detectors/ZeroAddress.md) | Low |  | ✔ |

Some of the detectors require [Soufflé](https://souffle-lang.github.io/install) to be installed. If no Soufflé installation is found, these detectors won't be executed.

A few detectors are optional and aimed at auditors to help uncover subtle issues in the source code. To enable all detectors, use the `--all-detectors` option. You can find a full list of configuration options on the [configuration page](./tutorial/configuration.md).

Each detector targets a specific type of problem in your code. Click on the detector name to learn more.
