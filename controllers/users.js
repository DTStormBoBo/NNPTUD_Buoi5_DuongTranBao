let userModel = require("../schemas/users");

module.exports = {
    // Create a new user
    CreateAnUser: async function (username, password, email, role, fullName, avatarUrl, status) {
        let newItem = new userModel({
            username: username,
            password: password,
            email: email,
            role: role,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status
        });
        await newItem.save();
        return newItem;
    },

    // Find user by ID (with populate role)
    FindByID: async function (id) {
        return await userModel
            .findOne({ _id: id, isDeleted: false })
            .populate({ path: 'role', select: 'name description' });
    },

    // Get all users
    GetAllUsers: async function () {
        return await userModel
            .find({ isDeleted: false })
            .populate({ path: 'role', select: 'name description' });
    },

    // Update user by ID
    UpdateUser: async function (id, updateData) {
        let user = await userModel.findOne({ _id: id, isDeleted: false });
        if (!user) return null;
        
        let keys = Object.keys(updateData);
        for (const key of keys) {
            user[key] = updateData[key];
        }
        await user.save();
        return await userModel
            .findById(user._id)
            .populate({ path: 'role', select: 'name description' });
    },

    // Soft delete user by ID
    DeleteUser: async function (id) {
        return await userModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    },

    // Enable user by email and username
    EnableUser: async function (email, username) {
        let user = await userModel.findOne({ 
            email: email, 
            username: username, 
            isDeleted: false 
        });
        if (!user) return null;
        
        user.status = true;
        await user.save();
        return user;
    },

    // Disable user by email and username
    DisableUser: async function (email, username) {
        let user = await userModel.findOne({ 
            email: email, 
            username: username, 
            isDeleted: false 
        });
        if (!user) return null;
        
        user.status = false;
        await user.save();
        return user;
    }
}