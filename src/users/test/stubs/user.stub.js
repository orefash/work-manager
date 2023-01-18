"use strict";

module.exports = {
    workerId: "worker1",
    adminId: "admin1",
    worker: () => {
        return {
            fullName: 'John Doe',
            email: 'john@mail.com',
            password: 'password',
            role: 'WORKER'
        }
    },
    admin: () => {
        return {
            fullName: 'Jane Doe',
            email: 'jane@mail.com',
            password: 'password',
            role: 'ADMIN'
        }
    }
}