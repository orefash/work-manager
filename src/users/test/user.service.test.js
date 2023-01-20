"use strict";
const { User, UserService } = require("../index");
const db = require("../../tests/db");
const { worker, admin } = require("./stubs/user.stub")

let workerId = undefined;
let adminId = undefined;
let workerData = worker();
let adminData = admin();

beforeAll(async () => {
    await db.setUp();

});

beforeEach(async () => {
    const workerUser = new User(workerData);
    workerId = (await workerUser.registerUser(workerUser))._id;

    const adminUser = new User(adminData);
    adminId = (await adminUser.registerUser(adminUser))._id;
});

afterEach(async () => {
    await db.dropCollections();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe("User Service", () => {
    const userService = UserService(User);

    describe("Get Users", () => {
        it("returns all saved users", async () => {
            let users = await userService.getUsers();

            expect(users).toBeDefined();
            expect(users.length).toEqual(2);
        })
        it("returns all admin users", async () => {
            let users = await userService.getUsers({ role: "ADMIN" });

            expect(users).toBeDefined();
            expect(users.length).toEqual(1);
        })
        it("returns all workers", async () => {
            let users = await userService.getUsers({ role: "WORKER" });

            expect(users).toBeDefined();
            expect(users.length).toEqual(1);
        })
    })

    describe("Get A User", () => {
        it("returns a saved user by Id", async () => {
            const worker = await userService.getUser({ _id: workerId });

            expect(worker).toBeDefined();
            expect(worker.role).toEqual('WORKER');
        })
        it("throws exception if id is invalid", async () => {

            var ObjectID = require('mongodb').ObjectID;

            var objectId = new ObjectID();

            await expect(userService.getUser({ _id: objectId })).rejects.toThrow('Invalid User!!');
        })
    })

    describe("Update User", () => {
        it("update user details and return updated user", async () => {
            let updateData = { fullName: "Jonathan Doe" }
            const worker = await userService.updateUser(workerId, updateData);

            expect(worker).toBeDefined();
            expect(worker.fullName).toEqual(updateData.fullName);
        })
        it("throws exception if id is invalid", async () => {
            let updateData = { fullName: "Jonathan Doe" }

            var ObjectID = require('mongodb').ObjectID;

            var objectId = new ObjectID();

            await expect(userService.updateUser(objectId, updateData)).rejects.toThrow();
        })

    })

    describe("Delete User", () => {
        it("deletes exiting user by id", async () => {

            const deleted = await userService.deleteUser(workerId);

            expect(deleted).toBeTruthy();
        })
        it("throws exception if id is invalid", async () => {

            var ObjectID = require('mongodb').ObjectID;

            var objectId = new ObjectID();

            await expect( userService.deleteUser(objectId)).rejects.toThrow();
        })

    })
})