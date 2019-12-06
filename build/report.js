"use strict";
/**
 * addMessage(messageObj, filePath)
 *    -> creates a new error object or adds to an existing one.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Report = /** @class */ (function () {
    function Report() {
        this.messages = {};
    }
    Report.prototype.addMessage = function (message, filePath) {
    };
    return Report;
}());
exports.default = Report;
