# universal-api-test

Test your universal code in node and browsers via karma with mocha and chai

## Install

```
$ npm install universal-api-test --save-dev
```

## Usage

You should place your test file in `test` folder in a root of your project.

Tests should follow structure below due to different approach to env variables in
node and karma (`karma-env-preprocessor`)

```js
var expect = require('chai').expect;

module.exports = function(yourLib, env) {
  it('1+1=2', function(done) {
    expect(yourLib.sum(1, 1)).to.equal(2);
  });
};

```

Add `universal-api-test` to `scripts` sections of your `package.json`

`VAR1,VAR2` will be passed to tests in `env` object.

```json
{
  "main": "index.js",
  "scripts": {
    "test": "universal-api-test VAR1,VAR2"
  }
}
```

You could always test separatelly on development machine

```
$ node_modules/.bin/universal-api-test
$ node_modules/.bin/universal-api-test --node
$ node_modules/.bin/universal-api-test --webpack
$ node_modules/.bin/universal-api-test --browserify
```

## License

MIT © [ewnd9](http://ewnd9.com)
