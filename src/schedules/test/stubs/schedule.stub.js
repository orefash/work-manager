"use strict";
const ObjectID = require('mongodb').ObjectID;
const shifts = require('../../../shifts');

const validUserId = new ObjectID();
const invalidId = "invalid";

let baseData = {
    date: Date.now(),
    worker: validUserId,
    shift: (Object.keys(shifts()))[0]
}

module.exports = {
    validScheduleData: () => {
        return {
            ...baseData,
            worker: new ObjectID()
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