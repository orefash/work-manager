'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        required: [true, "email required"],
        unique: [true, "email already registered"],
    },
    fullName: {
        type: String,
        required: [true, "full name is required"],
    },
    role: {
        type: String,
        default: "WORKER",
        index: true,
        required: [true, "user role is required"],
        enum: ["ADMIN", "WORKER"],
    },
    password: {
        type: String,
        required: [true, "password required"]
    }
},
    { timestamps: true });



userSchema.methods.registerUser = async (newUser) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newUser.password, salt);
        newUser.password = passwordHash;
        return newUser.save();
    } catch (err) {
        throw new Error('Register Error: ', err.message)
    }
};

userSchema.methods.toJSON = function () {
    var obj = this.toObject(); 
    delete obj.password;
    return obj;
}

module.exports = mongoose.model("user", userSchema, "user");