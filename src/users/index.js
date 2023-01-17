"use strict";
const User = require('./user.model');
const UserService = require('./user.service');
const UserController = require('./user.controller');


module.exports = {
    User: User,
    UserService: UserService,
    UserController: UserController.userRoutes(UserService(User))
}