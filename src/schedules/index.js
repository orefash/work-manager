"use strict";
const Schedule = require('./schedule.model');
const ScheduleService = require('./schedule.service')
const { User, UserService} = require('../users')

const userService = UserService(User);

module.exports = {
    Schedule: Schedule,
    ScheduleService: ScheduleService,
    scheduleService: ScheduleService(Schedule, userService)
}