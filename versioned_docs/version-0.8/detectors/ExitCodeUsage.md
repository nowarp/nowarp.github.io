# ExitCodeUsage
**Severity**: High | **Category**: Security

A detector that identifies improper use of exit codes outside the developer-allowed range.

## Why is it bad?
In the TON blockchain, exit codes are divided into specific ranges: 1 to 127
are reserved for the TVM or FunC, and 128 to 255 are reserved for Tact. This
structure leaves the range from 256 to 65535 for developers to define custom
exit codes.

When exit codes are defined outside this allowed range, it may lead to
conflicts with existing reserved codes, causing unintended behavior or
errors in the contract.

## Example
```tact
contract Foo {
    receive("foobar") {
        // Bad: exit code defined in the reserved range for Tact
        let code: Int = 128;
        nativeThrowUnless(code, sender() == self.owner);
    }
}
```

Use instead:
```tact
contract Foo {
    receive("foobar") {
        // OK: using exit code from the allowed range
        let code: Int = 256;
        nativeThrowUnless(code, sender() == self.owner);
    }
}
```

## Resources
1. [Exit Codes | Tact Docs](https://docs.tact-lang.org/book/exit-codes)
