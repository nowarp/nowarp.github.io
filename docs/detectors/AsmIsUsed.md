# AsmIsUsed
**Severity**: Info | **Category**: Security

An optional detector that highlights all the `asm` functions.

## Why is it bad?
Using TVM Assembly is a potentially dangerous operation that requires
additional attention from an auditor. This optional detector will highlight
all its uses to assist in contract security audits.

## Example
```tact
// Highlighted: the asm function use should be audited
asm fun getStorageFee(cells: Int, bits: Int, seconds: Int, is_masterchain: Bool): Int { GETSTORAGEFEE }
```
