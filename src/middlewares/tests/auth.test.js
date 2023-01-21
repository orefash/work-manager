"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { isAdmin, isLoggedIn } = require('../../middlewares/auth');



describe("Auth  Middlewares", () => {
    let mockedReq;
    let mockedRes;
    let mockedNext;



    beforeEach(async () => {

        mockedReq = {
            headers: {}
        };
        mockedRes = {
            send: jest.fn(),
        };
        mockedNext = jest.fn();

    });

    afterEach(async () => {
        jest.clearAllMocks()

    });

    describe("isAdmin", () => {

        it("calls next() is user is Admin", async () => {

            mockedReq = {
                user: {
                    role: "ADMIN"
                }
            }

            const result = await isAdmin(mockedReq, mockedRes, mockedNext);

            expect(mockedNext).toBeCalledTimes(1);
        });
        it("sends 500 status when user is not passed in request", async () => {

            const result = await isAdmin(mockedReq, mockedRes, mockedNext);

            expect(mockedRes.statusCode).toEqual(500);
            expect(mockedRes.send).toBeCalledWith("Invalid User");
        });
        it("sends 403 status if role is not ADMIN", async () => {
            mockedReq = {
                user: {
                    role: "WORKER"
                }
            }

            const result = await isAdmin(mockedReq, mockedRes, mockedNext);

            expect(mockedRes.statusCode).toEqual(403);
            expect(mockedRes.send).toBeCalledWith("Unauthorized!!");
        });
        it("sends 403 status if role is not included in user object", async () => {
            mockedReq = {
                user: {
                }
            }

            const result = await isAdmin(mockedReq, mockedRes, mockedNext);

            expect(mockedRes.statusCode).toEqual(403);
            expect(mockedRes.send).toBeCalledWith("Unauthorized!!");
        });



    });


    describe("isLoggedIn", () => {

        beforeEach(async () => {

            jest.mock('jsonwebtoken', () => ({
                verify: jest.fn((token, secret) => { })
            }));

        });

        it("calls next() if token is valid", async () => {

            mockedReq = {
                headers: {
                    'x-auth-token': "token"
                }
            }

            const result = await isLoggedIn(mockedReq, mockedRes, mockedNext);

            expect(mockedNext).toBeCalledTimes(1);
        });
        it("returns 401 status is token isnt defined", async () => {

            const result = await isLoggedIn(mockedReq, mockedRes, mockedNext);

            expect(mockedRes.statusCode).toEqual(401);
            expect(mockedRes.send).toBeCalledWith("A token is required for authentication");
        });




    });



});