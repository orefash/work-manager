"use strict";
const ObjectID = require('mongodb').ObjectID;
const shifts = require('../../../shifts');

const validUserId = "63c8e9dea08a3244b63e9d0b";
const invalidId = "invalid";

let baseData = {
    date: Date.now(),
    worker: validUserId,
    shift: (Object.keys(shifts()))[0]
}

module.exports = {
    validUserId: validUserId,
    validScheduleData: () => {
        return {
            ...baseData,
            worker: "63c8e9dea08a3244b63e9d05"
        }
    },
    validScheduleData2: () => {
        return baseData
    },
    invalidIdScheduleData: () => {
        return {
            ...baseData,
            worker: invalidId
        }
    },
    invalidShiftScheduleData: () => {
        return {
            ...baseData,
            shift: invalidId
        }
    },
    noDateScheduleData: () => {
        let data = { ...baseData }
        
        delete data['date']
        return data
    }
}