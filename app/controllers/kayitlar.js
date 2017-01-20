var Kayit = require('../models/kayit');

exports.getKayitlar = function(req, res, next){

    Kayit.find(function(err, kayitlar) {

        if (err){
            res.send(err);
        }

        res.json(kayitlar);

    });

}

exports.createKayit = function(req, res, next){

    Kayit.create({
        baslik : req.body.baslik,
        firma :  req.body.firma
    }, function(err, kayit) {

        if (err){
            res.send(err);
        }

        Kayit.find(function(err, kayitlar) {

            if (err){
                res.send(err);
            }

            res.json(kayitlar);

        });

    });

}

exports.deleteKayit = function(req, res, next){

    Kayit.remove({
        _id : req.params.kayit_id
    }, function(err, kayit) {
        res.json(kayit);
    });

}
