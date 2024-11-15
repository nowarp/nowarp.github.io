# SendInLoop
An optional detector that identifies send functions being called inside loops.

## Why is it bad?
Calling send functions inside loops can lead to unintended consequences, such as
excessive message sending, increased gas consumption, and potential race conditions.
Loops with send calls should be refactored to avoid these issues. This detector helps
flag such code, prompting the developer to reconsider the design.

## Example
```tact
fun exampleWhileLoop(limit: Int, owner: Address) {
  let i = 0;
  while (i < limit) {
      send(SendParameters{ // Highlighted: An auditor should review the loop
          to: owner,
          value: 0,
          bounce: false,
          body: Msg{ a: i }.toCell()
      });
      i += 1;
  }
}
```
