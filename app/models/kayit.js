var mongoose = require('mongoose');

var KayitSchema = new mongoose.Schema({

    baslik: {
        type: String,
        // lowercase: true,
        unique: true,
        required: true
    },
    firma: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Kayit', KayitSchema);
