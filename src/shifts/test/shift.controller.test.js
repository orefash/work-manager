"use strict";
const request = require('supertest');
const { server } = require('../../tests/app');
const ShiftController = require('../shift.controller');
const { shifts } = require('../index');


describe("Shift Controller - /api/shifts", () => {

    const scheduleController = ShiftController.shiftRoutes(shifts);
    let app;

    beforeAll(async () => {
        app = server((app) => {
            app.use("/api/shifts", scheduleController);
        });

    });

    afterEach(async () => {
        jest.clearAllMocks()

    });

    describe("GET /api/shifts", () => {
        it("returns all saved shifts with 200 status", async () => {

            const res = await request(app).get("/api/shifts");

            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.shifts).toBeDefined();
            expect(res.body.shifts).toEqual(shifts());

        })
    });

});