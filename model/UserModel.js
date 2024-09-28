const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true},
    email: {type: String, require: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profileImage: String
})
const User = mongoose.model("user-model", userSchema);

module.exports = User;
