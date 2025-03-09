# SuboptimalSend
A detector that identifies suboptimal message passing functions that could
be replaced with more gas-effective alternatives.

Tact 1.6 introduced more gas-effective alternatives to `send` that might
decrease gas consumption when used properly:
* [`message`](https://docs.tact-lang.org/ref/core-common/#message): a regular non-deployment message
* [`deploy`](https://docs.tact-lang.org/ref/core-common/#deploy): an effective contract deployment function
* [`cashback`](https://docs.tact-lang.org/ref/core-common/#cashback): more efficient way to send the remaining balance

## Why is it bad?
Using suboptimal send functions might lead to out-of-gas attacks, especially
when using at hot points.

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
