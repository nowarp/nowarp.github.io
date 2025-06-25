# PreferDeploy
A detector that identifies instances where the `send` function is used,
which could be replaced with its more efficient alternative: `deploy`.

##  Why is it bad?
Using `send` to deploy contracts has been deprecated since Tact 1.6 because
it results in unnecessarily high gas consumption.

## Example
```tact
let init = initOf SomeContract(p1, p2, p3);
send(SendParameters{
  to: contractAddress(init),
  code: init.code,
  data: init.data,
  value: 0,
  body: FooBar{}.asCell(),
});
```

Use instead:
```tact
deploy(DeployParameters{
  init: initOf SomeContract(p1, p2, p3),
  value: 0,
  body: FooBar{}.asCell(),
});
```
