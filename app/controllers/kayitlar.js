var Kayit = require('../models/kayit');

exports.getKayitlar = function(req, res, next){

  let st = new RegExp(req.query.term, "i")
    Kayit.find( { $or: [{baslik: st}, {firma:st}] },
                 function(err, kayitlar) {

        if (err){
            res.send(err);
        }

        res.json(kayitlar);
    });
}
    exports.getKayit = function(req, res, next){

        Kayit.findOne({ _id: req.params.kayit_id }, function(err, kayit) {

            if (err){
                res.send(err);
            }

            res.json(kayit);
        });
//     Kayit.find(function(err, kayitlar) {
//       console.log('/'+req.query.term+'/');
//
//       if (err){
//           res.send(err);
//       }
//       kayitlar.forEach(function(kayitloop){
//         for (var key in kayitloop) {
//           // console.log(kayitlar[key]);
//           // console.log('hebe');
//           console.log(kayitloop[key]);
//           if (/req.query.term/.test(kayitloop[key]) )
//          printjson(kayitloop);
//     }
// });
// res.json(kayitlar);
// });
}

exports.createKayit = function(req, res, next){
   console.log(req.body.baslik);
    Kayit.create({
        baslik : req.body.baslik,
        firma :  req.body.firma
    }, function(err, kayit) {

        if (err){
            res.send(err);
        }
        res.json(kayit);
    });

}

exports.updateKayit = function(req, res, next){
    console.log(req.body);
    Kayit.update({
        _id : req.params.kayit_id
    }, req.body, function(err, kayit) {

      if (err){
          res.send(err);
      }
        res.json(kayit);
    });
}

exports.deleteKayit = function(req, res, next){

    Kayit.remove({
        _id : req.params.kayit_id
    }, function(err, kayit) {

      if (err){
          res.send(err);
      }
        res.json(kayit);
    });
}
