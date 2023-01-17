"use strict";
const express = require('express');

const getUsers = async (req, res) => {
    try {
        let filter = req.query;
       
        const users = await userService.getUsers(filter);
        res.status(200)
        .json({
            success: true,
            users
        });

    } catch (error) {
        console.log("error: ",error.message)
        res.status(500)
        .json({
            success: false,
            message: error.message
        });
    }

}

function userRoutes(userService) {
    const router = express.Router();

    router.get("/", getUsers);



    return router;
}

module.exports.userRoutes = userRoutes;