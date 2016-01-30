var fs = require('fs');
var pkg = require('./package.json');

var browserSetup = 'window.UNIVERSAL_API_LIB = require("' + process.cwd() + '/' + pkg.main + '");';
fs.writeFileSync(__dirname + '/gen/setup-browser.js', browserSetup, 'utf-8');

var browserTest = 'require("' + process.cwd() + '/test/test' + '")(window.UNIVERSAL_API_LIB, window.__env__);';
fs.writeFileSync(__dirname + '/gen/run-browser.js', browserTest, 'utf-8');

var nodeTest =
  'var vkApi = require("' + process.cwd() + '/' + pkg.main + '");\n' +
  'require("' + process.cwd() + '/test/test' + '")(vkApi, process.env);';
fs.writeFileSync(__dirname + '/gen/run-node.js', nodeTest, 'utf-8');
