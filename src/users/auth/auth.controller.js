"use strict";
const express = require('express');


function authRoutes(authService) {
    const router = express.Router();

    router.post('/login', async (req, res) => {

        try {
            const user = await authService.loginUser(req.body);

            res.status(200).json({
                success: true,
                user: user
            });

        } catch (err) {
            res.status(400)
                .json({
                    success: false,
                    message: err.message
                });
        }
    });

    router.post('/register', async (req, res) => {

        try {
            const user = await authService.registerUser(req.body);

            res.status(200).json({
                success: true,
                user: user
            });

        } catch (err) {
            res.status(400)
                .json({
                    success: false,
                    message: err.message
                });
        }
    });

    router.post('/admin/register', async (req, res) => {

        try {
            let data = req.body;
            data.role = "ADMIN";
            const user = await authService.registerUser(data);

            res.status(200).json({
                success: true,
                user: user
            });

        } catch (err) {
            res.status(400)
                .json({
                    success: false,
                    message: err.message
                });
        }
    });


    return router;
}

module.exports.authRoutes = authRoutes;
