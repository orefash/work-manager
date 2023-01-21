"use strict";

const getUsers = (User) => async (filter = {}) => {
    let users = await User.find(filter, { password:0 });
    return users
}

const getUser = (User) => async (filter = {}) => {
    let user = await User.findOne(filter, { password:0 })

    if (!user) throw new Error('Invalid User!!')

    return user;
}


const updateUser = (User) => async (id, updateData) => {

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
    });

    if (!updatedUser) throw new Error('Invalid !!')

    return updatedUser
}

const deleteUser = (User) => async (id) => {
    const user = await User.findByIdAndDelete(id)

    if (!user) throw new Error('Invalid User ID!!')

    return true;
}


module.exports = (User) => {
    return {
        getUser: getUser(User),
        getUsers: getUsers(User),
        updateUser: updateUser(User),
        deleteUser: deleteUser(User)
    }
}