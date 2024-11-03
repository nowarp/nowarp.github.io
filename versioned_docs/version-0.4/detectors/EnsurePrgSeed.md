# EnsurePrgSeed
A detector that identifies all calls to `nativeRandom` and `nativeRandomInterval`
without a preceding PRG seed initialization.

## Why is it bad?
Using `nativeRandom` or `nativeRandomInterval` without first initializing the PRG seed via
`nativePrepareRandom`, `nativeRandomize`, or `nativeRandomizeLt` may lead to unintended behavior
or weak random number generation. This detector ensures that PRG seed initialization
is always performed before any use of random functions, enhancing contract security.

## Example
```tact
// Bad: `nativeRandom` is used without prior PRG seed initialization
fun generateRandomValue(): Int {
  return nativeRandom()
}
```

Use instead:
```tact
fun test(): Int {
  nativePrepareRandom();
}

// OK: PRG has been initialized somewhere in the contract
fun generateRandomValue(): Int {
  return nativeRandom()
}
```
