---
slug: ton-security-risks
title: "TON Security Risks: A Static Analysis Perspective"
authors: GeorgiyKomarov
tags: [misti, ton, "static analysis"]
hide_table_of_contents: false
---

import Spoiler from './components/Spoiler';
import ImgPipeline from './img/2025-01-26-pipeline.png';
import ImgWeb3Bugs from './img/2025-01-26-web3-bugs.png';
import DetectorLink from './components/DetectorLink';

Smart contracts are unforgiving. A single bug can vaporize millions of dollars. If you're coming from web development, forget everything you know about "move fast and break things" - here, breaking things means *actually breaking things*. With money. Real money.

This is where static analysis comes in. It's a technique that examines your code before deployment to automatically detect potential vulnerabilities. While no automated tool can guarantee security, static analysis can identify common pitfalls early in development.

This post:
- Explores static analysis capabilities and limitations for smart contracts security.
- Shows how this fits into [TON](https://ton.org/) security landscape through [Misti](https://nowarp.io/tools/misti/).

Understanding static program analysis enables you to add an additional layer of automated security verification to your development process, catching some vulnerabilities before they reach production.

<!-- truncate -->

## Static Analysis for Web3 and TON

### Static Program Analysis 101
Security tooling is an essential part of modern smart contract development, serving as the first line of defense against vulnerabilities. While manual code review remains crucial, automated analysis tools can systematically identify classes of bugs that would be tedious and error-prone to catch by hand.

Static program analysis examines code without executing it. The classic approach used in program analysis and compiler design is the Monotone Framework [[4]](#references). This builds abstract models of your program using [control flow graphs](https://en.wikipedia.org/wiki/Control-flow_graph) (CFGs) and [data flow analysis](https://en.wikipedia.org/wiki/Data-flow_analysis) to reason about program behavior without the undecidability of analyzing all possible runtime scenarios.

The analysis pipeline could be illustrated like this:

<div align="center"><img src={ImgPipeline}/></div>

In essence, the approach is straightforward: we read and analyze the code structure to identify potential security vulnerabilities, without executing the code itself.

There are also different analysis techniques that exist, which can be used to [explore concrete paths of execution](https://en.wikipedia.org/wiki/Symbolic_execution), [prove properties on a limited domain of program](https://en.wikipedia.org/wiki/Model_checking#Symbolic_model_checking), [prove program properties with more accuracy](https://en.wikipedia.org/wiki/Abstract_interpretation), and so on, but the core issue is always the same: [static undecidability](https://en.wikipedia.org/wiki/Rice%27s_theorem).

### Application to TON Smart Contracts
Smart contracts are just programs executing in blockchain. They have some differences, but fundamentally the same techniques of classic program analysis can be applied to smart contract analysis.

Being a dynamic field, web3 security is currently actively developing, new approaches are being tested, but still, that's a wild west: tools' impact on actual bug finding is suboptimal [[1]](#references). Despite that, we have a huge set of approaches described in papers and applied in commercial/free tools, we know about past bugs typical for other blockchains, and this knowledge can be extrapolated to TON.

TON creates its own unique architectural issues, while most of the generic web3 bugs from research and practical experience are still valid for TON. It has a runtime environment based on a stack machine and a couple of imperative languages without advanced language design solutions, which makes it quite similar to existing blockchain environments.

Examples of common security and functionality issues present in TON contracts include [[2]](#references):

<div align="center"><img src={ImgWeb3Bugs}/></div>

But the most complicated bugs in TON are related to its unique actor model and asynchronous message-passing [[3]](#references):
- Partial execution: state mutations due to asynchronous message passing
- Man in the middle in message flow
- *Anything* that requires understanding the specification of the system; thus requiring a manual audit

Here's the key point: complex bugs require understanding the system, and sometimes even developers don't fully understand it.

<Spoiler>Some of these issues could be mitigated by more advanced techniques, requiring formal specification of security properties of the system and subsequent verification. This could be done using a different category of tools and typically requires additional actions from the developer/auditor.</Spoiler>

## Misti: TON Static Analyzer
[Misti](https://nowarp.io/tools/misti) as a source-level analyzer for [Tact](https://tact-lang.org/) contracts based on monotone framework that works exactly as described above, as well as combining it with [Datalog-based analyses](https://nowarp.io/tools/misti/docs/next/hacking/souffle). Certainly it has all the limitations typical for this approach. These are essential and done by design.

Misti covers different categories of [security and optimization issues](https://nowarp.io/tools/misti/docs/next/detectors):
- Cell storage issues
- Resource exhaustion vectors potentially leading to [DoS](https://en.wikipedia.org/wiki/Denial-of-service_attack)
- Arithmetic issues
- Unauthorized access to critical functions and contract's state
- Code optimization
- Generic suspicious patterns:things we learn from web3 security in past

Let's consider some concrete case studies of analyses Misti implements for both generic smart contract issues and TON/Tact-specific problems.

### Cell storage issues
TON [stores](https://docs.ton.org/v3/concepts/dive-into-ton/ton-blockchain/cells-as-data-storage) persistent data in `Cell` structures. Cell is a low-level primitive containing up to `1023` bytes of data and up to `4` references to other cells used to create high-level data structures.

The possible issue with cells arises when access or write operation disrupts these limits. When the user tries either to load non-existing data from a cell or write data/references beyond the specified limits, it leads to `CellUnderflow` and `CellOverflow` [compute phase exceptions](https://docs.ton.org/v3/documentation/tvm/tvm-exit-codes#standard-exit-codes):

```tact
let b1 = beginCell();
b1 = b1.storeInt(self.data, 257);
b1 = b1.storeInt(self.balance, 257);
b1 = b1.storeInt(self.owner_data, 257);
// CellOverflow: storing more than 1023 bits
b1 = b1.storeInt(msg.info, 257);
```

```tact
let s1 = beginCell() // Creating a Slice with 1 reference
           .storeRef(c)
           .endCell()
           .asSlice();
let ref1 = s1.loadRef(); // OK
let ref2 = s1.loadRef(); // CellUnderflow
```

Because of the asynchronous nature of TON, these issues may lead to unexpected message flow disrupting the logic of the contract.

The main issue of detecting these is that in Tact, Cell operations might be used within different data structures like Builder, Slice, Cell, Struct and Message, and might require reasoning about the source code within different function/method calls.

The <DetectorLink name="CellBounds"/> detector tries to handle this by statically inspecting the source code.

### Tact-specific issues
There are plenty of Tact-specific issues covered by Misti. Let's consider some of them with source code examples.

#### Function arguments in Tact are immutable
Thus, the developer should not mutate them expecting they'll be changed in the callsite. The <DetectorLink name="ArgCopyMutation"/> detector finds these cases (unless the developer explicitly returns the modified parameter):

```tact
fun setA(a: Int, m: map<Int, Int>) {
  // Bad: `m` won't be modified in the callsite
  m.set(self.key, a);
}
```

#### Some exit codes are reserved
Codes from 0 to 255 [are reserved](https://docs.tact-lang.org/book/exit-codes/) by Tact and TON. Thus, the developer should never use them to avoid breaking the expected behavior of the contract. The <DetectorLink name="ExitCodeUsage"/> detector interprets the possible numeric values used in exit codes in order to detect suspicious cases like these:

```tact
receive("test") {
  // Bad: Throwing the reserved `128` code
  nativeThrowUnless(128, sender() == self.owner);
}
```

#### Don't overlap string receivers values
Tact has [text receivers](https://docs.tact-lang.org/book/receive/) which accept a particular string as a message. The issue arises when a generic receiver (defined `receive()`) handles these messages:

```tact
contract Test {
  receive("test") {}
  receive(msg: String) {
    // Bad: "test" message should be handles in `receive("test")`
    if (msg == "test") { /*...*/ }
  }
}
```

This leads to unexpected control flow making some receivers unreachable. The <DetectorLink name="StringReceiversOverlap"/> detector handles this.

#### Choose better Tact API
Tact, being a dynamically developed language, can introduce new features making code more effective or deprecate some features or create safer alternatives or potentially dangerous functions.

Examples of these functions include but are not limited to:
1. [`nativeSendMessage`](https://docs.tact-lang.org/ref/core-advanced#nativesendmessage) should be replaced with [`send`](https://docs.tact-lang.org/book/send/)
2. [`nativeRandom`](https://docs.tact-lang.org/ref/core-advanced/#nativerandom) should be replaced with [`randomInt`](https://docs.tact-lang.org/ref/core-random/#randomint)
3. Tact provides optimized versions of `send`: [`deploy`](https://docs.tact-lang.org/ref/core-common/#deploy) and [`message`](https://docs.tact-lang.org/ref/core-common/#message)

Here is some illustrating code:

```tact
contract Test {
  receive() {
    // Bad: Prefer more effective `deploy` function
    let init = initOf A();
    send(SendParameters{ code: init.code, /* ... */ });

    // Bad: Prefer `emptySlice()`
    let s: Slice = emptyCell().asSlice();
  }
}
```

It might be not-so-easy to follow all the updates within different versions of the Tact compiler; thus Misti covers this. Examples of detectors of this category include <DetectorLink name="PreferredStdlibApi"/> and <DetectorLink name="SuboptimalSend"/>.

### Arithmetic issues
A classic arithmetic issue typical for smart contracts is division before multiplication. The thing is that typically the division operation can leave some remainder that might be missed when using multiplication afterward. If there is no handling of the remainder, the contract might lose user funds or tokens on such operations:

```tact
let a: Int = 10;
let b: Int = 3;
let c: Int = 2;
// Bad: Division before multiplication
let result: Int = a / b * c;
}
```

The <DetectorLink name="DivideBeforeMultiply"/> detector can detect these cases.

#### Use random properly
TVM implements some [PRG functionality](https://docs.ton.org/v3/guidelines/smart-contracts/security/random-number-generation). When using it in Tact, the developer should care about API usage and read the documentation carefully. They always have to initialize seed correctly using either the Tact standard library [`nativePrepareRandom`](https://docs.tact-lang.org/ref/core-advanced/#nativepreparerandom) or some TVM assembly to initialize the seed. <DetectorLink name="EnsurePrgSeed"/> ensures the random seed is set up before accessing randomness features.

<Spoiler>Using TVM random functionality [is insecure](https://docs.ton.org/v3/guidelines/smart-contracts/security/random-number-generation#is-this-method-100-secure) for the most critical cases anyway, since node owners can affect the *seed* value. You can find different solutions to this, most likely you'll use oracles.</Spoiler>

### Unprotected calls or state changes
In smart contracts there are always privileged functions which e.g. destroy contract, send funds, and it is possible to change critical parameters through sending messages. All this functionality essentially should be protected from random users to avoid cases like [The Parity Wallet Hack](https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7).

Here is some code illustrating this for Tact:
```tact
receive(s1: Slice) {
  let a = s1.loadAddress();
  // Bad: Anyone could send funds to an arbitrary address
  // The protection would be to `require` a specific sender address
  send(SendParameters{ to: a, /*...*/ });
}
```

The <DetectorLink name="UnprotectedCall"/> detector can protect your code against such cases.

### Generic code issues
There are plenty of issues typical not only for smart contracts but for normal programs as well. But while using these issues in *not safety-critical systems* typically doesn't lead to severe damage, in contracts the results might be much worse. Let's consider some case studies:

#### Be careful with copy-paste
A typical case is when you need slightly different logic that makes no sense to parametrize to avoid overcomplicating your code. But you should be careful there, not forgetting to update all the branches after copy-pasting and later when refactoring your code:
```tact
if (self.lockPeriod > HALF_YEAR) {
  require(sender == self.owner, "Only owner can trade");
} else {
  // Bad: The developer forgot to update the copy-pasted branch
  require(sender == self.owner, "Only owner can trade");
}
```
The <DetectorLink name="BranchDuplicate"/> detector can find equal branches in code.

#### Get rid of dead code
Dead code is not as simple as it sounds. It not only clutters your codebase but often indicates that the developer:
- Forgot to implement the intended logic (e.g. unused constant or write-only field)
- Didn't check the error returning from the function (can lead to control flow anomalies, search for: `weird ERC20 attack` and read [[5]](#references) for more)

Examples of dead code detectors in Misti are: <DetectorLink name="NeverAccessedVariables"/>, <DetectorLink name="ReadOnlyVariables"/>, <DetectorLink name="UnusedExpressionResult"/>.

## Conclusion
We've considered the basic information about static program analysis and it's application to the TON security landscape. Now, here are some concrete steps to increase security you should be thinking about.

### Increase security of your project
* **Integrate security tools:** Use every possibility to make your code secure. Static analysis is a good as a first line of defense, catching common vulnerabilities early and automatically. Add Misti to your [CI/CD](https://nowarp.io/tools/misti/docs/tutorial/ci-cd) and integrate it [in the development process](https://t.me/nowarp_io/4).
* **Apply development practices:** testing, design, formal specification or at least documentation. This develops a separate post and might be highlighted in this blog later. Prefer [a safe language](https://tact-lang.org/).
* **Set up processes:** Security not only about analysis and audits: you should think in advance about security development in incident response processes.
* **Do security audit:** While static analysis enhances the security process, it cannot replace thorough manual audits. For production contracts, professional security audits remain essential. You could find our contacts on [nowarp.io](https://nowarp.io) or browse security teams collaborating with TF.

### Future Directions in Misti
There are many possibilities in TON security automation. Our concrete steps in Misti for the next months:
- Implementing [IFDS with path-sensitivity tracking](https://github.com/nowarp/misti/issues/254) in order to improve accuracy of interprocedural taint analysis
- Implement more Tact detectors using advanced static analysis techniques. The concrete roadmap will be available in the [GitHub milestones](https://github.com/nowarp/misti/milestones).
- Improve integrability and API to support third-party developers
- Provide better tooling for auditors to actually understand the structure of contracts

Overall, Misti still following the development of the Tact language and improves it support to make development on it more smooth and secure.

## References
1. [Smaragdakis et al. – Symbolic Value Analysis for Smart Contracts](https://yanniss.github.io/symvalic-oopsla21.pdf)
2. [Zhang et al. - Demystifying Exploitable Bugs in Smart Contracts](https://github.com/ZhangZhuoSJTU/Web3Bugs/blob/main/papers/icse23.pdf)
3. [TON Documentation: Secure Smart Contract Programming](https://docs.ton.org/v3/guidelines/smart-contracts/security/secure-programming)
4. [Anders Møller and Michael I. Schwartzbach – Static Program Analysis](https://cs.au.dk/~amoeller/spa/spa.pdf)
5. [Gan et al. – Why Trick Me: The Honeypot Traps on Decentralized Exchanges](https://dl.acm.org/doi/10.1145/3605768.3623546)
