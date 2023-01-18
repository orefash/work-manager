"use strict";

const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

const { UserController } = require("./users");

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

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


app.use("/api/users", UserController);

module.exports = app;