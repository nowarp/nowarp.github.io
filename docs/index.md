---
id: intro
title: Misti
slug: /
sidebar_position: 1
---

Misti is a static analysis tool for [Tact](https://tact-lang.org/) smart contracts.

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/nowarp/misti
cd misti
yarn install && yarn build
```

## Quick Start
Run Misti by specifying a Tact project configuration:
```bash
./bin/misti test/projects/simple/tactConfig.json
```
