const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  engineerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  allocationPercentage: {
    type: Number,
    required: true,
    min: [1, 'Allocation must be at least 1%.'],
    max: [100, 'Allocation cannot exceed 100%.']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
    trim: true // e.g., 'Developer', 'Tech Lead', etc.
  }
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
