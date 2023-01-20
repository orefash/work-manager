"use strict";
require("dotenv").config();
const { User } = require("../../index");
const AuthService = require("../../auth/auth.service");
const db = require("../../../tests/db");
const { worker, admin } = require("../stubs/user.stub");

let workerId = undefined;
let adminId = undefined;
let workerData;
let adminData;

beforeAll(async () => {
    await db.setUp();
});

beforeEach(async () => {

    workerData = worker();
    delete workerData['role'];
    adminData = admin();

});

afterEach(async () => {
    await db.dropCollections();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe("Auth Service", () => {
    const authService = AuthService(User);

    describe("Register User", () => {
        it("saves a new worker and returns the details", async () => {
            let user = await authService.registerUser(workerData);

            expect(user).toBeDefined();
            expect(user.password).not.toBeDefined();
            expect(user.email).toEqual(workerData.email);
            expect(user.role).toEqual("WORKER");
            expect(user.fullName).toEqual(workerData.fullName);
        });
        it("saves a new admin and returns the details", async () => {
            let user = await authService.registerUser(adminData);

            expect(user).toBeDefined();
            expect(user.password).not.toBeDefined();
            expect(user.email).toEqual(adminData.email);
            expect(user.role).toEqual("ADMIN");
            expect(user.fullName).toEqual(adminData.fullName);
        });
        it("throws exception if email is not included", async () => {
            delete workerData["email"];

            await expect(authService.registerUser(workerData)).rejects.toThrow("Incomplete User Details!!");
        });
        it("throws exception if password is not included", async () => {
            delete workerData["password"];

            await expect(authService.registerUser(workerData)).rejects.toThrow("Incomplete User Details!!");
        });
        it("throws exception if fullName is not included", async () => {
            delete workerData["fullName"];

            await expect(authService.registerUser(workerData)).rejects.toThrow("Incomplete User Details!!");
        });
        it("throws exception if user with email exists already", async () => {
            await authService.registerUser(workerData);

            await expect(authService.registerUser(workerData)).rejects.toThrow("User with email exists!!");
        });
    });

    describe("Login User", () => {
        let loginData;
        beforeEach(async () => {
            loginData = {
                email: workerData.email,
                password: workerData.password
            }
        });
        it("logins in a user and returns token and user details", async () => {
            await authService.registerUser(workerData);
            let user = await authService.loginUser(loginData);
          

            expect(user).toBeDefined();
            expect(user).toEqual(expect.objectContaining({
                token: expect.any(String)
            }));
            expect(user.email).toEqual(workerData.email);
            expect(user.role).toEqual("WORKER");
            expect(user.fullName).toEqual(workerData.fullName);
        });
        it("throws exception if email is not included", async () => {
            
            delete loginData["email"];

            await expect(authService.loginUser(loginData)).rejects.toThrow("Incomplete Login Details!!");
        });
        it("throws exception if password is not included", async () => {
            delete loginData["password"];

            await expect(authService.loginUser(loginData)).rejects.toThrow("Incomplete Login Details!!");
        });
        it("throws exception if user with email does not exist", async () => {

            await expect(authService.loginUser(loginData)).rejects.toThrow("Invalid Credentials!!");
        });
        it("throws exception if login password is wrong", async () => {
            loginData.password = "invalid";

            await authService.registerUser(workerData);

            await expect(authService.loginUser(loginData)).rejects.toThrow("Invalid Credentials!!");
        });

    });
})