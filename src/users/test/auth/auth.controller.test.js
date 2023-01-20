"use strict";
const request = require('supertest');
const { server } = require('../../../tests/app');
const { worker, workerId, admin } = require("../stubs/user.stub");
const AuthController = require('../../auth/auth.controller');
const authService = require('./mocks/auth.service');


describe("Auth Controller - /api/auth", () => {

    const authController = AuthController.authRoutes(authService);
    let app;

    beforeAll(async () => {
        app = server((app) => {
            app.use("/api/auth", authController);
        });

    });

    afterEach(async () => {
        jest.clearAllMocks()

    });

    describe("POST /api/auth/login", () => {
        it("logis in user with 200 status", async () => {

            const res = await request(app).post("/api/auth/login")
            .send(
                {
                    email: worker().email,
                    password: worker().password
                }
            );

            expect(authService.loginUser).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.user).toBeDefined();

        });
        it("return error message and 400 status if error occurs", async () => {
            authService.loginUser.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).post("/api/auth/login")
            .send(
                {
                    email: worker().email,
                    password: worker().password
                }
            );

            expect(authService.loginUser).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        });
    });

    describe("POST /api/auth/register", () => {
        it("registers worker with 200 status and returns user details", async () => {

            const res = await request(app).post("/api/auth/register")
            .send(worker());

            expect(authService.registerUser).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.user).toBeDefined();

        })
        it("return error message and 400 status if error occurs", async () => {
            authService.registerUser.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).post("/api/auth/register")
            .send(worker());

            expect(authService.registerUser).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    });


    describe("POST /api/auth/admin/register", () => {
        it("registers worker with 200 status and returns user details", async () => {

            const res = await request(app).post("/api/auth/admin/register")
            .send(admin());

            expect(authService.registerUser).toBeCalled();
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeTruthy();
            expect(res.body.user).toBeDefined();

        })
        it("return error message and 400 status if error occurs", async () => {
            authService.registerUser.mockImplementationOnce(() => {
                throw new Error();
            });

            const res = await request(app).post("/api/auth/admin/register")
            .send(admin());

            expect(authService.registerUser).toBeCalled();
            expect(res.status).toEqual(400);
            expect(res.body).toBeDefined();
            expect(res.body.success).toBeFalsy();

        })
    })

})