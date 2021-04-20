"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    run: function (_a) {
        var parameters = _a.parameters, runtime = _a.runtime, print = _a.print, strings = _a.strings, meta = _a.meta;
        var infoMessage = strings.isBlank(parameters.first)
            ? "Welcome to " + print.colors.cyan(runtime.brand) + " CLI version " + meta.version() + "!"
            : "Sorry, didn't recognize that command!";
        print.info("\n  " + infoMessage + "\n  Type " + print.colors.magenta(runtime.brand + " --help") + " to view common commands.");
    },
};
//# sourceMappingURL=default.js.map