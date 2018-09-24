#!/bin/bash
# relies on receiving environment variable when called
set -e

ENVIRONMENT=$1

# branch and build info
export GIT_BRANCH=${BITBUCKET_BRANCH:-n/a}
export GIT_COMMIT=$(git rev-parse HEAD | cut -c1-7)

# debug
echo "about to deploy to '${ENVIRONMENT}' on commit '${GIT_COMMIT}'"

# serverless deploy
npm run deploy -- --stage ${ENVIRONMENT}
