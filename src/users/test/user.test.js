"use strict";
const mongoose = require("mongoose");
const { User } = require("../index");
const db = require("../../tests/db");
const { worker, admin } = require("./stubs/user.stub")

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe("User model", () => {
  it("registers a valid user successfully", async () => {
    const validUser = new User(worker());
    const savedUser = await validUser.registerUser(validUser);

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(worker().email);
    expect(savedUser.password).toBeDefined();
  });

  it("should throw exception for incomplete user data", async () => {
    let invalidUserdata = worker()
    delete invalidUserdata['email']
    const invalidUser = new User(invalidUserdata);

    await expect(invalidUser.registerUser(invalidUser)).rejects.toThrow()
  });

 

})