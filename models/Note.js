const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    dates: {
        type: Date
    }
});

module.exports = mongoose.model('Note', NoteSchema)