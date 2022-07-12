"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const dotenv = require("dotenv").config();
exports.client = new pg_1.Client(process.env.DATABASE_URL);
exports.client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    }
    else {
        console.log('connected');
    }
});
