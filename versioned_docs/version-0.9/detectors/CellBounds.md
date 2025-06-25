# CellBounds
**Severity**: Critical | **Category**: Security

A detector that identifies cell overflow and underflow problems.

## Why is it bad?
Cell overflow and underflow are issues specific to the TON blockchain. TON
stores data in cells, which are low-level data structures used for serialization
and deserialization.

The overflow issue occurs when the user attempts to store more data in a cell
than it supports. The current limitation is 1023 bits and 4 references to other
cells. When these limits are exceeded, the contract throws an error with the
exit code `8` during the compute phase.

The underflow issue occurs when the user attempts to get more data from a
structure than it supports. cells. When it happens, the contract throws an
error with the exit code `9` during the compute phase.

## Example
```tact
// Bad: storeRef is used more than 4 times
beginCell()
  .storeRef(...)
  .storeAddress(myAddress())
  .storeRef(...)
  .storeRef(...)
  .storeRef(...)
  .storeRef(...)
  .endCell()
```

Use instead:
```tact
// OK: Fixed after the analyzer highlighted it
beginCell()
  .storeRef(...)
  .storeAddress(myAddress())
  .storeRef(...)
  .storeRef(...)
  .storeRef(...)
  .endCell()
```

## Resources
1. [Cell & Bag of Cells (BoC) | TON Docs](https://docs.ton.org/develop/data-formats/cell-boc)
2. [TVM Exit codes | TON Docs](https://docs.ton.org/learn/tvm-instructions/tvm-exit-codes)
3. [Cells, Builders and Slices | Tact Docs](https://docs.tact-lang.org/ref/core-cells/)
