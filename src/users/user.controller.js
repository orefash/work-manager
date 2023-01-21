"use strict";
const express = require('express');
const { isAdmin, isLoggedIn } = require('../middlewares/auth');

function userRoutes(userService) {
    const router = express.Router();

    router.get("/", [isLoggedIn, isAdmin], async (req, res) => {
        try {
            let filter = req.query;

            const users = await userService.getUsers(filter);
            res.status(200)
                .json({
                    success: true,
                    users
                });

        } catch (error) {
            res.status(400)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });

    router.get("/:id", isLoggedIn, async (req, res) => {
        try {
            let id = req.params.id;
            let filter = { _id: id };

            const user = await userService.getUser(filter);
            res.status(200)
                .json({
                    success: true,
                    user: user
                });

        } catch (error) {
            res.status(400)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });

    router.patch("/:id", isLoggedIn, async (req, res) => {
        try {
            let id = req.params.id;
            let updateQuery = req.body;

            const user = await userService.updateUser(id, updateQuery);
            res.status(200)
                .json({
                    success: true,
                    user: user
                });

        } catch (error) {
            res.status(400)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });


    router.delete("/:id", [isLoggedIn, isAdmin], async (req, res) => {
        try {
            let id = req.params.id;

            const deleted = await userService.deleteUser(id);
            res.status(200)
                .json({
                    success: true,
                    deleted: deleted
                });

        } catch (error) {
            res.status(400)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });



    return router;
}

module.exports.userRoutes = userRoutes;