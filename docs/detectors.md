---
id: detectors
title: Detectors Overview
---

# Detectors Overview

## Built-in Detectors

| #  | Detector | Severity | Category | Requires Soufflé | Enabled by default |
|----|----------|----------|----------|------------------|--------------------|
| 1  | [ArgCopyMutation](./detectors/ArgCopyMutation.md) | High | Security |  | ✔ |
| 2  | [AsmIsUsed](./detectors/AsmIsUsed.md) | Info | Security |  |  |
| 3  | [BranchDuplicate](./detectors/BranchDuplicate.md) | High | Security |  | ✔ |
| 4  | [CellBounds](./detectors/CellBounds.md) | Critical | Security |  | ✔ |
| 5  | [ConstantAddress](./detectors/ConstantAddress.md) | Info | Security |  |  |
| 6  | [DivideBeforeMultiply](./detectors/DivideBeforeMultiply.md) | High | Security | ✔ | ✔ |
| 7  | [DumpIsUsed](./detectors/DumpIsUsed.md) | Info | Security |  |  |
| 8  | [DuplicatedCondition](./detectors/DuplicatedCondition.md) | High | Security |  | ✔ |
| 9  | [DuplicatedImport](./detectors/DuplicatedImport.md) | Medium | Optimization |  | ✔ |
| 10  | [EnsurePrgSeed](./detectors/EnsurePrgSeed.md) | Medium | Security |  | ✔ |
| 11  | [EtaLikeSimplifications](./detectors/EtaLikeSimplifications.md) | Low | Optimization |  | ✔ |
| 12  | [ExitCodeUsage](./detectors/ExitCodeUsage.md) | High | Security |  | ✔ |
| 13  | [FalseCondition](./detectors/FalseCondition.md) | Medium | Security |  | ✔ |
| 14  | [FieldDoubleInit](./detectors/FieldDoubleInit.md) | Medium | Optimization |  | ✔ |
| 15  | [ImplicitOpcode](./detectors/ImplicitOpcode.md) | Info | Best Practices |  |  |
| 16  | [InheritedStateMutation](./detectors/InheritedStateMutation.md) | Low | Best Practices |  |  |
| 17  | [NeverAccessedVariables](./detectors/NeverAccessedVariables.md) | Medium | Security |  | ✔ |
| 18  | [OptimalMathFunction](./detectors/OptimalMathFunction.md) | Low | Optimization |  | ✔ |
| 19  | [PreferAugmentedAssign](./detectors/PreferAugmentedAssign.md) | Info | Best Practices |  |  |
| 20  | [PreferBinaryReceiver](./detectors/PreferBinaryReceiver.md) | Low | Optimization |  | ✔ |
| 21  | [PreferSenderFunction](./detectors/PreferSenderFunction.md) | Low | Optimization |  | ✔ |
| 22  | [PreferredStdlibApi](./detectors/PreferredStdlibApi.md) | Info—Low | Optimization, Security |  | ✔ |
| 23  | [ReadOnlyVariables](./detectors/ReadOnlyVariables.md) | Medium | Security | ✔ | ✔ |
| 24  | [SendInLoop](./detectors/SendInLoop.md) | Medium | Security |  |  |
| 25  | [ShortCircuitCondition](./detectors/ShortCircuitCondition.md) | Low | Optimization |  | ✔ |
| 26  | [StateMutationInGetter](./detectors/StateMutationInGetter.md) | Info | Security |  |  |
| 27  | [StringReceiversOverlap](./detectors/StringReceiversOverlap.md) | High | Security |  | ✔ |
| 28  | [SuboptimalCellOperation](./detectors/SuboptimalCellOperation.md) | Medium | Optimization |  | ✔ |
| 29  | [SuboptimalSend](./detectors/SuboptimalSend.md) | Medium | Optimization |  | ✔ |
| 30  | [SuspiciousLoop](./detectors/SuspiciousLoop.md) | Medium | Security |  | ✔ |
| 31  | [SuspiciousMessageMode](./detectors/SuspiciousMessageMode.md) | Low—Medium | Security |  | ✔ |
| 32  | [UnboundLoop](./detectors/UnboundLoop.md) | High | Security | ✔ | ✔ |
| 33  | [UnboundMap](./detectors/UnboundMap.md) | Low | Security |  |  |
| 34  | [UnprotectedCall](./detectors/UnprotectedCall.md) | High | Security |  | ✔ |
| 35  | [UnusedExpressionResult](./detectors/UnusedExpressionResult.md) | Medium | Security |  | ✔ |
| 36  | [UnusedOptional](./detectors/UnusedOptional.md) | Low | Optimization |  | ✔ |
| 37  | [ZeroAddress](./detectors/ZeroAddress.md) | Low | Security |  | ✔ |

Some of the detectors require [Soufflé](https://souffle-lang.github.io/install) to be installed. If no Soufflé installation is found, these detectors won't be executed.

A few detectors are optional and aimed at auditors to help uncover subtle issues in the source code. To enable all detectors, use the `--all-detectors` option. You can find a full list of configuration options on the [configuration page](./tutorial/configuration.md).

Each detector targets a specific type of problem in your code. Click on the detector name to learn more.

## Detector Severities and Categories

### Severity Levels

Findings are classified according to their impact severity:

| Severity | Description |
|----------|-------------|
| **Info** | Informational findings that highlight potential improvements |
| **Low** | Minor issues with limited impact |
| **Medium** | Significant issues that should be addressed |
| **High** | Serious vulnerabilities requiring immediate attention |
| **Critical** | Severe vulnerabilities with catastrophic potential impact |

### Categories

Findings are organized into the following categories:

| Category | Description |
|----------|-------------|
| **Security** | Any possible unintended behavior leading to bugs or vulnerabilities |
| **Optimization** | Code improvements for gas-optimizations |
| **Best Practices** | General code quality advices |
