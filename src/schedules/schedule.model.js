'use strict';
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    worker: {
        type: mongoose.Types.ObjectId, 
        ref: "user",
        index: true,
        required: [true, "Worker ID is required"]
    },
    date: {
        type: Date,
        index: true,
        required: [true, "Shift Date is required"]
    },
    shift: {
        type: String,
        required: [true, "ShiftId is required"]
    }
},
{ timestamps: true });

module.exports = mongoose.model("schedule", scheduleSchema, "schedule");
