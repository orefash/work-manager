"use strict";
const request = require('supertest');
const { server } = require('../../tests/app');
const ScheduleController = require('../schedule.controller');
const scheduleService = require('./mocks/schedule.service');
const { validScheduleData2, validUserId } = require("./stubs/schedule.stub");



describe("Schedule Controller - /api/schedules", () => {

    const scheduleController = ScheduleController.scheduleRoutes(scheduleService);
    let app;

    beforeAll(async () => {
        app = server((app) => {
            app.use("/api/schedules", scheduleController);
        });

    });

    afterEach(async () => {
        jest.clearAllMocks()

    });

    describe("GET /api/schedules", () => {
        it("returns all saved schedules with 200 status", async () => {

            const res = await request(app).get("/api/schedules");

            expect(scheduleService.getSchedules).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.schedules).toBeDefined();
            expect(res.body.schedules.length).toEqual(2);

        })
        it("return error message and 400 status if error occurs", async () => {
            scheduleService.getSchedules.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).get("/api/schedules");

            expect(scheduleService.getSchedules).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    });

    describe("GET /api/schedules/:id", () => {
        it("returns a saved schedule by ID with 200 status", async () => {

            const res = await request(app).get("/api/schedules/"+validUserId);

            expect(scheduleService.getScheduleById).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.schedule).toBeDefined();
            expect(res.body.schedule).toEqual(validScheduleData2());

        })
        it("return error message and 400 status if error occurs", async () => {
            scheduleService.getScheduleById.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).get("/api/schedules/"+validUserId);

            expect(scheduleService.getScheduleById).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })

    describe("PATCH /api/schedules/:id", () => {
        it("returns all saved schedules with 200 status", async () => {

            const res = await request(app).patch("/api/schedules/"+validUserId)
            .send(validScheduleData2());

            expect(scheduleService.updateSchedule).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.schedule).toBeDefined();
            expect(res.body.schedule).toEqual(validScheduleData2());

        })
        it("return error message and 400 status if error occurs", async () => {
            scheduleService.updateSchedule.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).patch("/api/schedules/"+validUserId)
            .send(validScheduleData2());

            expect(scheduleService.updateSchedule).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })


    describe("DELETE /api/schedules/:id", () => {
        it("deletes the schedule with ID and returns 200 status", async () => {

            const res = await request(app).delete("/api/schedules/"+validUserId);

            expect(scheduleService.deleteSchedule).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.deleted).toBeDefined();
            expect(res.body.deleted).toBeTruthy();

        })
        it("return error message and 400 status if error occurs", async () => {
            scheduleService.deleteSchedule.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).delete("/api/schedules/"+validUserId);

            expect(scheduleService.deleteSchedule).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })

    describe("POST /api/schedules", () => {
        it("saves a new schedule and returns the data with 200 status", async () => {

            const res = await request(app).post("/api/schedules")
            .send(validScheduleData2());

            expect(scheduleService.saveSchedule).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.schedule).toBeDefined();
            expect(res.body.schedule).toEqual(validScheduleData2());

        })
        it("return error message and 400 status if error occurs", async () => {
            scheduleService.saveSchedule.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).post("/api/schedules")
            .send(validScheduleData2());

            expect(scheduleService.saveSchedule).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })


})