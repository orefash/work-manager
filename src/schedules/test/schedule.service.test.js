"use strict";
const { when } = require('jest-when')
const { Schedule, ScheduleService } = require("../index");
const db = require("../../tests/db");
const { validScheduleData, validScheduleData2, invalidIdScheduleData, invalidShiftScheduleData, noDateScheduleData } = require("./stubs/schedule.stub")




describe("Schedule Service", () => {
    let userService;
    let scheduleService;
    let validData1 = validScheduleData();
    let validData2 = validScheduleData2();

    const getUser = jest.fn();

    beforeAll(async () => {
        await db.setUp();
        const getUser = jest.fn();

        const validUserData = { _id: validData1.worker, role: 'WORKER' };
        const validUserData2 = { _id: validData2.worker, role: 'WORKER' };
        const invalidUserData = { _id: invalidIdScheduleData().worker };

        when(getUser).calledWith(validUserData).mockReturnValue(validUserData);
        when(getUser).calledWith(validUserData2).mockReturnValue(validUserData2);
        when(getUser).calledWith(invalidUserData).mockReturnValue(null);
        userService = {
            getUser: getUser
        }

    });

    beforeEach(async () => {
        scheduleService = ScheduleService(Schedule, userService);
    });

    afterEach(async () => {
        await db.dropCollections();
    });

    afterAll(async () => {
        await db.dropDatabase();
    });


    describe("saveSchedule", () => {
        it("saves a new valid Schedule and returns the details", async () => {
            let schedule = await scheduleService.saveSchedule(validData1);

            expect(userService.getUser).toBeCalled();
            expect(schedule).toBeDefined();
            expect(schedule.shift).toEqual(validData1.shift);
            expect(schedule.worker).toEqual(validData1.worker);
        });
        it("should throw an exception if an invalid user ID is passed", async () => {
            await expect( scheduleService.saveSchedule(invalidIdScheduleData())).rejects.toThrow("Invalid Worker ID");
        });
        it("should throw an exception if an invalid Shift ID is passed", async () => {
            await expect( scheduleService.saveSchedule(invalidShiftScheduleData())).rejects.toThrow("Invalid Shift ID");
        });
        it("should throw an exception if a an existing shift exists in a day for a worker", async () => {

            let schedule = await scheduleService.saveSchedule(validData1);
            await expect( scheduleService.saveSchedule(validData1)).rejects.toThrow(`Worker has existing shift on set Date`);
        });
    })

    describe("Get Schedules", () => {
        it("returns all saved schedules", async () => {
            await scheduleService.saveSchedule(validData1);
            let scheduleData2 = { ...validData1, date: (new Date()).getDate() + 1}
            await scheduleService.saveSchedule(scheduleData2);

            let schedules = await scheduleService.getSchedules();

            expect(schedules).toBeDefined();
            expect(schedules.length).toEqual(2);
        })
        it("returns all schedules for a particular Worker", async () => {
            await scheduleService.saveSchedule(validData1);
            await scheduleService.saveSchedule(validData2);

            let schedules = await scheduleService.getSchedules({worker: validData1.worker});

            expect(schedules).toBeDefined();
            expect(schedules.length).toEqual(1);
        })
        it("returns all schedules for a particular day", async () => {
            await scheduleService.saveSchedule(validData1);
            await scheduleService.saveSchedule(validData2);

            let scheduleData2 = { ...validData1, date: (new Date()).getDate() + 1}
            await scheduleService.saveSchedule(scheduleData2);


            let schedules = await scheduleService.getSchedules({date: validData1.date});

            expect(schedules).toBeDefined();
            expect(schedules.length).toEqual(2);
        })
    })

    describe("Get Schedule By Id", () => {
        it("returns a saved schedule by Id", async () => {
            let savedSchedule = await scheduleService.saveSchedule(validData1);

            let schedule = await scheduleService.getScheduleById(savedSchedule._id);

            expect(schedule).toBeDefined();
            expect(schedule.worker).toEqual(validData1.worker);
        })
        it("returns a saved schedule by Id", async () => {

            let schedule = await scheduleService.getScheduleById(validData1.worker);

            expect(schedule).toBeNull();
        })
    })

    describe("Update Schedule", () => {
        let updateData = { shift: "shift2", date: (new Date()).getDate() + 1 }

        it("update schdule details (shift / date) and return updated schedule", async () => {
            let savedSchedule = await scheduleService.saveSchedule(validData1);

            let updatedSchedule = await scheduleService.updateSchedule(savedSchedule._id, updateData)

            expect(updatedSchedule).not.toBeNull();
            expect(updatedSchedule.shift).toEqual(updateData.shift);
        })
        it("throws exception if id is invalid", async () => {

            var ObjectID = require('mongodb').ObjectID;

            var objectId = new ObjectID();

            await expect(scheduleService.updateSchedule(objectId, updateData)).rejects.toThrow();
        })

    })

    describe("Delete Schedule", () => {
        it("deletes exiting user by id", async () => {

            let savedSchedule = await scheduleService.saveSchedule(validData1);

            const deleted = await scheduleService.deleteSchedule(savedSchedule._id);

            expect(deleted).toBeTruthy();
        })
        it("throws exception if id is invalid", async () => {

            var ObjectID = require('mongodb').ObjectID;

            var objectId = new ObjectID();

            await expect( scheduleService.deleteSchedule(objectId)).rejects.toThrow();
        })

    })
})