const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    developer: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    rating: { type: Number },
    imageUrl: { type: String }
    // Agrega otros campos según sea necesario
});

module.exports = mongoose.model('Game', gameSchema);
