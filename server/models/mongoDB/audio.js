const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioSchema = new Schema({
    // audioBuffer: Buffer,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    userId: String,
    audioUrl: String,
});

module.exports = mongoose.model('Audio', audioSchema);