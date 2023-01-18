"use strict";
const request = require('supertest');
const { server } = require('../../tests/app');
// const app = require('../../app');
const UserController = require('../user.controller');
const userService = require('./mocks/user.service');


describe("User Controller - /api/users", () => {

    const userController = UserController.userRoutes(userService);
    let app;

    beforeAll(async () => {
        app = server((app) => {
            app.use("/api/users", userController);
        });

    });

    afterEach(async () => {
        jest.clearAllMocks()

    });

    describe("GET /api/users", () => {
        it("returns all saved users", async () => {

            const res = await request(app).get("/api/users");

            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.users).toBeDefined();
            expect(res.body.users.length).toEqual(2);

        })
        it("returns all saved users", async () => {
            userService.getUsers.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).get("/api/users");

            expect(res.status).toEqual(500);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })



})