"use strict";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (User) => async (userData) => {

    let { email, fullName, password } = userData;

    if (!email || !password || !fullName) throw Error("Incomplete User Details!!")

    let checkUser = await User.findOne({ email });
    if (checkUser) throw Error("User with email exists!!");

    const newUser = new User(userData);

    let registered = await newUser.registerUser(newUser);

    return registered.toJSON();
}


const loginUser = (User) => async (loginData) => {
    let { email, password } = loginData;

    if (!email || !password) throw Error("Incomplete Login Details!!");

    let checkUser = await User.findOne({ email });

    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {

        const secretOrKey = process.env.JWT_SECRET;
        const jwtExpiry = process.env.JWT_EXPIRY;

        const token = jwt.sign(
            {
                id: checkUser._id,
                email: checkUser.email,
                iat: Math.floor(Date.now() / 1000),
            },
            secretOrKey,
            {
                expiresIn: jwtExpiry
            }
        );

        checkUser = checkUser.toJSON();
        checkUser.token = token;

        return checkUser;
    } else {
        throw new Error('Invalid Credentials!!')
    }


}

module.exports = (User) => {
    return {
        registerUser: registerUser(User),
        loginUser: loginUser(User)
    }
}