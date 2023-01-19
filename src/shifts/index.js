"use strict";
const ShiftController = require('./shift.controller');

const shifts = () => {
    return {
        'shift1': {
            shift: 1,
            startTime: '0h',
            endTime: '8h'
        },
        'shift2': {
            shift: 2,
            startTime: '8h',
            endTime: '16h'
        },
        'shift3': {
            shift: 3,
            startTime: '16h',
            endTime: '24h'
        }
    }
}

module.exports = {
    shifts: shifts,
    ShiftController: ShiftController.shiftRoutes(shifts)
};