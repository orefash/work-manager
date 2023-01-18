"use strict";

const express = require("express");

const server = (configure) => {
    const app = express();
    app.use(express.json({ limit: "1mb" }));
    configure(app);
    return app;
}

module.exports = {
    server
}