const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,     
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        isEmail: true
    },
    createdAt: {
        type: String,
        immutable: true,
        default: () => {
            const date = new Date();
            return date.toString();
        },
    },
    updatedAt: {
        type: String,
        default: () => {
            const date = new Date();
            return date.toString();
        },
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER",
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    },
    ticketsCreated: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    },
    ticketsAssigned: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    }

})

module.exports = mongoose.model("User", userSchema)