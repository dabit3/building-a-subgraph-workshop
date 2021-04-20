"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// first, do a sniff test to ensure our dependencies are met
var sniff = require('../sniff');
// check the node version
if (!sniff.isNewEnough) {
    console.log('Node.js 7.6+ is required to run. You have ' + sniff.nodeVersion + '. Womp, womp.');
    process.exit(1);
}
// we want to see real exceptions with backtraces and stuff
process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', function (up) {
    throw up;
});
// export the `build` command
var builder_1 = require("./domain/builder");
exports.build = builder_1.build;
// export the toolbox
var filesystem_tools_1 = require("./toolbox/filesystem-tools");
exports.filesystem = filesystem_tools_1.filesystem;
var string_tools_1 = require("./toolbox/string-tools");
exports.strings = string_tools_1.strings;
var print_tools_1 = require("./toolbox/print-tools");
exports.print = print_tools_1.print;
var system_tools_1 = require("./toolbox/system-tools");
exports.system = system_tools_1.system;
var semver_tools_1 = require("./toolbox/semver-tools");
exports.semver = semver_tools_1.semver;
var http_tools_1 = require("./toolbox/http-tools");
exports.http = http_tools_1.http;
var patching_tools_1 = require("./toolbox/patching-tools");
exports.patching = patching_tools_1.patching;
var prompt_tools_1 = require("./toolbox/prompt-tools");
exports.prompt = prompt_tools_1.prompt;
var package_manager_tools_1 = require("./toolbox/package-manager-tools");
exports.packageManager = package_manager_tools_1.packageManager;
// this adds the node_modules path to the "search path"
// it's hacky, but it works well!
require('app-module-path').addPath(__dirname + "/../node_modules");
require('app-module-path').addPath(process.cwd());
//# sourceMappingURL=index.js.map