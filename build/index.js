"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});
rl.on('line', function (line) {
    console.log('line');
    // process.stdout.write(line);
});
