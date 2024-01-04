const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");

fs.readFile("./async.js","utf-8",
    (err, data) => {
        if(err) rejects(err)
        else resolve(data)
    })