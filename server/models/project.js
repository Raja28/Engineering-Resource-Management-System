const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    },
    requiredSkills: [{
        type: String,
        default: []
    }],
    teamSize: {
        type: Number,
        min: 1,
        required: true
    },
    status: {
        type: String,
        enum: ['planning', 'active', 'completed'],
        default: 'planning'
    },
    managerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
