const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Engineer', 'Manager'],
        required: true
    },
    // Optional fields for engineers
    skills: [{
        type: String,
        default: [],
    }],
    seniority: {
        type: String,
        enum: ['junior', 'mid', 'senior'],
        default: null,
    },
    maxCapacity: {
        type: String,
        enum: ['part-time', 'full-time'],
        default: 'full-time',
    },
    department: {
        type: String,
        default: null
    }
});

// conditional validation for engineer-only fields
userSchema.pre('save',async function (next) {
    if (this.role === 'engineer') {
        if (!this.skills || this.skills.length === 0) {
            return next(new Error('Engineers must have at least one skill.'));
        }
        if (!this.seniority || !this.maxCapacity) {
            return next(new Error('Engineers must have seniority and maxCapacity defined.'));
        }
    }
    // Hash password before saving
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
