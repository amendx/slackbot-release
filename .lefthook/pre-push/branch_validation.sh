#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
REGEX="^(bug(s)?|feature|chore|dependabot|dependency)/.+$"

if ! [[ $BRANCH =~ $REGEX ]]; then
  echo "Your push was rejected due to branching name"
  echo "Please rename your branch with '${REGEX}' syntax"
  exit 1
fi
