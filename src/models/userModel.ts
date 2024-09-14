import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Provide an email."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password Required."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenDate: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User