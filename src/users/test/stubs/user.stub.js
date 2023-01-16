
let testUser = {
    fullName: 'John Doe',
    email: 'john@mail.com',
    password: 'password'
}
module.exports = {
    worker: () => {
        return {
            ...testUser,
            role: 'WORKER'
        }
    },
    admin: () => {
        return {
            ...testUser,
            role: 'ADMIN'
        }
    }
}