const { Schema, model } = require('mongoose');

const User = model("User", new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps : true }));

module.exports = model("User") || User;