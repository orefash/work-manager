"use strict";
const { when } = require('jest-when');
const { worker, admin, workerId, adminId } = require("../stubs/user.stub");

let updateUser = jest.fn();
when(updateUser).calledWith(workerId, worker()).mockReturnValue(worker());

const userService = {
    getUsers: jest.fn().mockReturnValue([worker(), admin()]),
    getUser: jest.fn().mockReturnValue(worker()),
    updateUser: updateUser,
    deleteUser: jest.fn().mockReturnValue(true)
};

module.exports = userService;