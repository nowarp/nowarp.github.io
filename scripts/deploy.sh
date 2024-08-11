#!/usr/bin/env bash
set -eou pipefail

export USE_SSH=true
export GIT_USER="jubnzv"
export REPO="git@github.com:nowarp/nowarp.github.io.git"
export BRANCH="gh-pages"

# Deploy on github-pages
cd build
git init
git add .
git commit -m "Deploy site"
git branch -M $BRANCH
git push -f $REPO $BRANCH
