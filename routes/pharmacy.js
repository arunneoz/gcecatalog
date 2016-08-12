var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
//var Cart = require('../models/cart');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

router.get('/api/getpatient', function (req, res,next) {
if(req.session.spatient)
{
spatient = req.session.spatient
res.json(spatient);
console.log("Retrieved Session Data" + spatient.name);
}
else {
  res.send("Something went wrong");
}

});

router.get('/api/searchpatients/:name', function (req, res, next) {
    var name1 = req.params.name;
    sess = req.session;
     console.log("In serverside " + name1);
    //var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    Patient.find({name: req.params.name}, function (err, patient) {

        console.log(patient);
        if (err)
        res.send(err);
        sess.spatient = patient;
        console.log("Saved Session"+ sess.spatient.name);
        res.json(patient);
        //res.end();
      //  res.redirect('/');

    });
});

module.exports = router;
