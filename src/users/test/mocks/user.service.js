"use strict";
const { worker, admin } = require("../stubs/user.stub");


const userService = {
    getUsers: jest.fn().mockResolvedValue([worker(), admin()])
};

module.exports = userService;