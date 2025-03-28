const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    status: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
    dueDate: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
