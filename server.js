"use strict";

require("dotenv").config();

const dbConnection = require('./src/db')

const app = require("./src/app");

var port = process.env.PORT || 3002;


dbConnection.on('error', () => console.error.bind(console, 'MongoDB Connection error'));

dbConnection.once('open', () => {
    console.info('Connection to MongoDB is successful')
    app.listen(port, console.log("Server started on port - ", port));
});

