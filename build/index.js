"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var report_1 = __importDefault(require("report"));
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});
rl.on('line', function (line) {
    var data = JSON.parse(line);
    var report = new report_1.default();
    data.forEach(function (file) {
        file.messages.forEach(function (message) {
            report.addMessage(message, file.filePath);
        });
    });
});
