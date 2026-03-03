let roleModel = require("../schemas/roles");

module.exports = {
    // Create a new role
    CreateRole: async function (name, description) {
        let newItem = new roleModel({
            name: name,
            description: description || ""
        });
        await newItem.save();
        return newItem;
    },

    // Find role by ID
    FindByID: async function (id) {
        return await roleModel.findOne({ _id: id, isDeleted: false });
    },

    // Get all roles
    GetAllRoles: async function () {
        return await roleModel.find({ isDeleted: false });
    },

    // Update role by ID
    UpdateRole: async function (id, updateData) {
        let role = await roleModel.findOne({ _id: id, isDeleted: false });
        if (!role) return null;
        
        if (updateData.name) role.name = updateData.name;
        if (updateData.description !== undefined) role.description = updateData.description;
        
        await role.save();
        return role;
    },

    // Soft delete role by ID
    DeleteRole: async function (id) {
        return await roleModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }
}
