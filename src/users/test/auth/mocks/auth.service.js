"use strict";
const { when } = require('jest-when');
const { worker, admin, workerId } = require("../../stubs/user.stub");



const authService = {
    registerUser: jest.fn().mockReturnValue(worker()),
    loginUser: jest.fn().mockReturnValue(worker())
};

module.exports = authService;