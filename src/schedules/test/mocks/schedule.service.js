"use strict";

const { validScheduleData, validScheduleData2 } = require('../stubs/schedule.stub');

const scheduleService = {
    updateSchedule: jest.fn().mockReturnValue(validScheduleData2()),
    getScheduleById: jest.fn().mockReturnValue(validScheduleData2()),
    getSchedules: jest.fn().mockReturnValue([ validScheduleData(), validScheduleData2() ]),
    saveSchedule: jest.fn().mockReturnValue(validScheduleData2()),
    deleteSchedule: jest.fn().mockReturnValue(true)
};

module.exports = scheduleService;