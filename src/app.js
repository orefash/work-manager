"use strict";

const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const passport = require("passport");

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());

var whitelist = []

app.use(cors({
    origin: whitelist, // (Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
}))

const serverStatus = () => {
    return {
        state: 'up',
        dbState: mongoose.STATES[mongoose.connection.readyState]
    }
};

app.get("/api/uptime", (req, res) => {
    res.status(200).json(
        serverStatus()
    );
});

module.exports = app;