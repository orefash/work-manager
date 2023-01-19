"use strict";
const shifts = require('../shifts');

const saveSchedule = (Schedule, userService) => async (scheduleData) => {

    const { worker, shift, date } = scheduleData;
    let workShifts = shifts();

    if(!workShifts[shift]) throw Error("Invalid Shift ID");

    let userFilter = {_id: worker, role: "WORKER"};

    let user = await userService.getUser(userFilter);

    if(!user) throw Error("Invalid Worker ID");

    let existingShift = await Schedule.findOne({ date, worker });

    if(existingShift) throw Error(`Worker has existing shift on set Date`);

    const newSchedule = new Schedule({ worker, date, shift });

    return newSchedule.save();
}

const getSchedules = (Schedule) => async (filter = {}) => {
    let schedules = await Schedule.find(filter).populate('worker');
    let workShifts = shifts();
    
    let detailedSchedules = schedules.map((schedule)=>{
        let shiftData = workShifts[schedule.shift];
        let scheduleDetails = { scheduleId: schedule._id, worker: schedule.worker, date: schedule.date, createdAt: schedule.createdAt, shift: shiftData}

        return scheduleDetails;
    })

    return detailedSchedules;
}

const getScheduleById = (Schedule) => async (id) => {
    let schedule = await Schedule.findOne({_id: id})

    if(!schedule) throw Error('Invalid Schedule Id');
    
    return schedule;
}

const updateSchedule = (Schedule) => async (id, updateData) => {

    const updatedSchedule = await Schedule.findByIdAndUpdate(id, updateData, {
        new: true,
    });

    if (!updatedSchedule) throw new Error('Invalid !!')

    return updatedSchedule
}

const deleteSchedule = (Schedule) => async (id) => {
    const schedule = await Schedule.findByIdAndDelete(id)

    if (!schedule) throw new Error('Invalid !!')

    return true;
}

module.exports = (Schedule, userService) => {
    return{
        saveSchedule: saveSchedule(Schedule, userService),
        getSchedules: getSchedules(Schedule),
        getScheduleById: getScheduleById(Schedule),
        updateSchedule: updateSchedule(Schedule),
        deleteSchedule: deleteSchedule(Schedule)
    }
}