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
    },

    adres: {
        type: String
    },

    telefon: {
      type: String
    },

    makina: {
        type: String
    },

    seri: {
        type: String
    },

    garanti: {
        type: String,
        enum: ['evet', 'hayir'],
        default: 'evet'
    },
    bedel: {
        type: Number
    },
    odeme: {
        type: String,
        enum: ['odenmedi', 'nakit', 'kredikarti', 'ceksenet'],
        default: 'odenmedi'
    },
    olusturan: {
      type: String
    },
    guncelleyen: {
      type: String
    }

}, {
    timestamps: true
  });

module.exports = mongoose.model('Kayit', KayitSchema);
