import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},{
    timestamps: true,
});

// Add Validation for Password Strength
userSchema.path("password").validate(function (password) {
    return password.length >= 8; // Minimum length of 8 characters
}, "Password must be at least 8 characters long");

// Hash password before saving
userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}
// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        {_id: this._id, role: this.role},
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d"}
    );
    return token;
}

// Update password
userSchema.methods.updatePassword = async function (newPassword) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, salt);
    await this.save();
}

// Add a Virtual Field for Full Name
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Indexes for faster queries
userSchema.index({ email: 1});
userSchema.index({ username: 1})

const User = mongoose.model("User", userSchema);

export default User;