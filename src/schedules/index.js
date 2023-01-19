"use strict";
const Schedule = require('./schedule.model');
const ScheduleService = require('./schedule.service');
const ScheduleController = require('./schedule.controller');
const { User, UserService} = require('../users');

const userService = UserService(User);
const scheduleService = ScheduleService(Schedule, userService);

module.exports = {
    Schedule: Schedule,
    ScheduleService: ScheduleService,
    ScheduleController: ScheduleController.scheduleRoutes(scheduleService)
}