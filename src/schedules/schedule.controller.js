"use strict";
const express = require('express');
const { isAdmin, isLoggedIn } = require('../middlewares/auth');

function scheduleRoutes(scheduleService) {
    const router = express.Router();

    router.post('/', [isLoggedIn, isAdmin], async (req, res) => {

        try {
            const createdSchedule = await scheduleService.saveSchedule(req.body);

            res.status(200).json({
                success: true,
                schedule: createdSchedule
            });

        } catch (err) {
            res.status(400)
                .json({
                    success: false,
                    message: err.message
                });
        }
    });

    router.get("/", isLoggedIn, async (req, res) => {
        try {
            let filter = req.query;

            const schedules = await scheduleService.getSchedules(filter);
            res.status(200)
                .json({
                    success: true,
                    schedules
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

            const schedule = await scheduleService.getScheduleById(id);
            res.status(200)
                .json({
                    success: true,
                    schedule: schedule
                });

        } catch (error) {
            res.status(400)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });

    router.patch("/:id", [isLoggedIn, isAdmin], async (req, res) => {
        try {
            let id = req.params.id;
            let updateQuery = req.body;

            const schedule = await scheduleService.updateSchedule(id, updateQuery);
            res.status(200)
                .json({
                    success: true,
                    schedule: schedule
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

            const deleted = await scheduleService.deleteSchedule(id);

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

module.exports.scheduleRoutes = scheduleRoutes;