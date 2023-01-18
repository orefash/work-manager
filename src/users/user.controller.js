"use strict";
const express = require('express');


function userRoutes(userService) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            let filter = req.query;

            const users = await userService.getUsers(filter);
            res.status(200)
                .json({
                    success: true,
                    users
                });

        } catch (error) {
            console.log("error: ", error.message)
            res.status(500)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            let id = req.params.id;
            let filter = {_id: id};

            const users = await userService.getUser(filter);
            res.status(200)
                .json({
                    success: true,
                    users
                });

        } catch (error) {
            console.log("error: ", error.message)
            res.status(500)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });



    return router;
}

module.exports.userRoutes = userRoutes;