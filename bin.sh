#!/bin/bash

set -e

dir="$( cd "$( dirname "$0" )" && pwd)"

rl () {
  readlink -f "$dir/../.bin/$1"
}

rt () {
  readlink -f "$PWD/$1"
}

lo () {
  f1=$(readlink -f "$dir/universal-api-test")
  f2=$(dirname "$f1/")

  readlink -f "$f2/$1"
}

ex () {
  echo "$@"
  eval "$@"
}

mocha () {
  ex "$(rl mocha)" --require babel/register "$(lo gen/run-node.js)" "$@"
}

karmaStart () {
  ( ex "$(rl karma)" start "$(lo "karma.conf.js")" "$(lo "gen/run-browser.js")" "$1" "$envs")
}

karmaWebpack () {
  ( ex "$(rl webpack)" --config "$(lo "webpack.config.js")" "$(lo "gen/setup-browser.js")" ) && \
  ( karmaStart "$(lo "/gen/app.webpack.bundle.js")")
}

karmaBrowserify () {
  ( ex "$(rl browserify)" "$(lo "gen/setup-browser.js")" -o "$(lo gen/app.browserify.bundle.js)" ) && \
  ( karmaStart "$(lo "/gen/app.browserify.bundle.js")")
}

karma () {
  (karmaWebpack) && (karmaBrowserify)
}

fullTest () {
  ( ex node "$(lo gen-tests)" ) && (mocha) && (karma)
}

ex node "$(lo gen-tests)"
testenv="all"

for i
do
  if [ "$i" == "--node" ] || [ "$i" == "--node-watch" ] || [ "$i" == "--browserify" ] || [ "$i" == "--webpack" ]; then
    testenv=$i
  else
    envs=$i
  fi
done

if [ "$testenv" == "--node" ]; then
  mocha
elif [ "$testenv" == "--node-watch" ]; then
  mocha -w
elif [ "$testenv" == "--browserify" ]; then
  karmaBrowserify
elif [ "$testenv" == "--webpack" ]; then
  karmaWebpack
else
  (mocha) && (karmaBrowserify) && (karmaWebpack)
fi
