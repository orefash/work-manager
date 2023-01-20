"use strict";
const User = require('./user.model');
const UserService = require('./user.service');
const UserController = require('./user.controller');
const AuthController = require('./auth/auth.controller');
const AuthService = require('./auth/auth.service');


module.exports = {
    User: User,
    UserService: UserService,
    UserController: UserController.userRoutes(UserService(User)),
    AuthController: AuthController.authRoutes(AuthService(User))
}