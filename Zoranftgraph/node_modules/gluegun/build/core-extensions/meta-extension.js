"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_tools_1 = require("../toolbox/meta-tools");
/**
 * Extension that lets you learn more about the currently running CLI.
 *
 * @param toolbox The running toolbox.
 */
function attach(toolbox) {
    var meta = {
        src: toolbox.runtime && toolbox.runtime.defaultPlugin && toolbox.runtime.defaultPlugin.directory,
        version: function () { return meta_tools_1.getVersion(toolbox); },
        packageJSON: function () { return meta_tools_1.getPackageJSON(toolbox); },
        commandInfo: function () { return meta_tools_1.commandInfo(toolbox); },
        checkForUpdate: function () { return meta_tools_1.checkForUpdate(toolbox); },
    };
    toolbox.meta = meta;
}
exports.default = attach;
//# sourceMappingURL=meta-extension.js.map