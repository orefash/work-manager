"use strict";

module.exports = {
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