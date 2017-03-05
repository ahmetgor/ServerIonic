var Kayit = require('../models/kayit');

exports.getKayitlar = function(req, res, next){

  // console.log(JSON.stringify(req.user.firma)+'req query');
  var st = new RegExp(req.query.term, "i")
  // var kayit = req.query.kayit;
  var owner = req.user.firma;
  var query = JSON.parse(req.query.kayit);
  var order = JSON.parse(req.query.orderBy);
  // query = { $and: {firma: "firma"} };
  // console.log(query);
  // console.log(order+'order');

    Kayit.find(
      {
    $and : [ query, {owner: owner},
      { $or: [{baslik: st}, {firma:st}] }
    ]
}
,function(err, kayitlar) {

        if (err){
            res.send(err);
        }

        res.json(kayitlar);
    }).sort(order);
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
   req.body.owner = req.user.firma;
  //  console.log(req.user+'reqreq');
  //  console.log(req.body.owner);

    Kayit.create(
        req.body,
     function(err, kayit) {

        if (err){
            res.send(err);
        }
        res.json(kayit);
    });

}

exports.updateKayit = function(req, res, next){
    // console.log(req.body);
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
