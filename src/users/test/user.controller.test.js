"use strict";
const request = require('supertest');
const { server } = require('../../tests/app');
const { worker, workerId } = require("./stubs/user.stub");
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
        it("returns all saved users with 200 status", async () => {

            const res = await request(app).get("/api/users");

            expect(userService.getUsers).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.users).toBeDefined();
            expect(res.body.users.length).toEqual(2);

        })
        it("return error message and 400 status if error occurs", async () => {
            userService.getUsers.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).get("/api/users");

            expect(userService.getUsers).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })

    describe("GET /api/users/:id", () => {
        it("returns a saved user by id with 200 status", async () => {

            const res = await request(app).get("/api/users/" + workerId);

            expect(userService.getUser).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.user).toBeDefined();
            expect(res.body.user).toEqual(worker());

        })
        it("return error message and 400 status if error occurs", async () => {
            userService.getUser.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).get("/api/users/" + workerId);

            expect(userService.getUser).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })

    describe("PATCH /api/users/:id", () => {
       
        it("updates a saved user by id; returns 200 status", async () => {

            const res = await request(app).
                patch("/api/users/" + workerId).send(worker());

            expect(userService.updateUser).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.user).toBeDefined();
            expect(res.body.user).toEqual(worker());

        })
        it("return error message and 400 status if error occurs", async () => {
            userService.updateUser.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).patch("/api/users/" + workerId).send(worker());

            expect(userService.updateUser).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })

    describe("DELETE /api/users/:id", () => {
       
        it("delete a saved user by id; returns 200 status", async () => {

            const res = await request(app).
                delete("/api/users/" + workerId);

            expect(userService.deleteUser).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.deleted).toBeTruthy();

        })
        it("return error message and 400 status if error occurs", async () => {
            userService.deleteUser.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).delete("/api/users/" + workerId);

            expect(userService.deleteUser).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })


})