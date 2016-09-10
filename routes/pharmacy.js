var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Prescription = require('../models/prescription');
var username = "jdg";
var password = "summertime1!";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var request = require('request');
var url = "http://prescriber-datagrid.172.16.177.135.xip.io/rest/prescribercache/";
//var Cart = require('../models/cart');
var DURRequestSchema = require('node-schema-object');


var DURRequest = new DURRequestSchema({

  id: String,
  name: String,
  medications: {type: Array, unique: true, arrayType: Drug},
  prescription: Prescription1},
  {
 // Add methods to User prototype
 methods: {

   setDrugs: function(drugs) {

     this.medications.push(drugs);

   },

   setPrescription: function(prescription) {
      this.prescription.drugName= prescription.drugName;
      this.prescription.id= prescription.id;
      this.prescription.drugDose= prescription.drugDose;
      this.prescription.drugFreq= prescription.drugFreq;

   },

   getPatient: function() {

       return this;

   }

}

});

var Drug = new DURRequestSchema({
   name: String},
   {
  // Add methods to User prototype
  methods: {
    getDisplayName: function() {
      return this.name;
    }

}
});

var Prescription1 = new DURRequestSchema({
   id: String,
   drugName: String,
   drugDose: Number,
   drugFreq: Number

});

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


router.post('/api/calculateQty', function(req,res,next){

  var data = 20;
//  var drug1 = "";
//  var drug2 = new Drug({ name: 'Biaxin'});
//  var prescription1 = new Prescription1({id: 'rx1234', drugName: 'Saldine', drugDose: 10, drugFreq: 2})
//  var durReq = new DURRequest ({id: '124', name: 'Arun'});
  //durReq.medications.push(drug1);
//  durReq.medications.push(drug2);

  var  currentPrescriptions = "";


   Prescription.find({patientId: '124'}, function (err, prescription) {

      // console.log(prescription);
       if (err)
       res.send(err);
       currentPrescriptions = prescription;
       var drug1 = "";
     //  var drug2 = new Drug({ name: 'Biaxin'});
       var prescription1 = new Prescription1({id: 'rx1234', drugName: 'Saldine', drugDose: 10, drugFreq: 2})
       var durReq = new DURRequest ({id: '124', name: 'Arun'});
       //durReq.medications.push(drug1);
     //  durReq.medications.push(drug2);
       durReq.setPrescription(prescription1);
       //console.log("Saved Session"+ JSON.stringify(currentPrescriptions));
       currentPrescriptions.forEach(function(obj) { //console.log(obj.drugname);
         drug1 = new Drug({ name: obj.drugname});
         console.log(drug1.getDisplayName());
         durReq.setDrugs(drug1);


       });
       console.log("Schema Object " + JSON.stringify(durReq.getPatient()));
       //res.json(prescription);
       //res.end();
     //  res.redirect('/');

   });


  //console.log("Retrieved from POSt Call -->" + JSON.stringify(req.body));
  res.status(200).json({
    "qty": "20"
  });

  //res.end(20);





});



router.post('/api/createPrescription', function(req,res,next){






  var prescription = new Prescription({drugname: req.body.drugName, startDate: req.body.startDate,
													dea: req.body.deaNumber, docName: req.body.docName,
                          routeCode:req.body.routeCode , drugdose: req.body.dose, drugUnits: req.body.doseUnits,
                          drugDuration: req.body.duration, drugFreq:req.body.freq , drugQty:req.body.totalQty ,
                          drugCUnits:req.body.drugCUnits ,patientInstructions:req.body.patientInstructions ,
                          pharmacistInstructions:req.body.pharmacistInstructions, patientId:req.body.patientId,status: "Success"});


  console.log("Saving Prescription -->" + JSON.stringify(req.body));





  prescription.save(function (err) {
    if (err) {
      res.status(500).json({
        "err": err
      });
    }
    else {
      res.status(200).json({
        "result": "Success"
      });
    }


});
  //res.end(20);





});



router.get('/api/getPrescriptions/:id', function (req, res, next) {
    var pid = req.params.id;
    sess = req.session;
    console.log("In serverside " + pid);

    Prescription.find({patientId: pid}, function (err, prescription) {

        console.log(prescription);
        if (err)
        res.send(err);
        sess.sprescription = prescription;
        console.log("Saved Session"+ sess.sprescription._id);
        res.json(prescription);
        //res.end();
      //  res.redirect('/');

    });
});






router.get('/api/verifydea/:deaNumber', function (req, res,next) {
//var dea = req.params.deaNumber;
var name1 = req.params.deaNumber;
console.log("Inside DEA validation Service " + name1 + "going to invoke endpoint " + url+name1 );
var uri = url+name1;

request({
  uri: uri,
  headers : {
      "Authorization" : auth,
      "Content-Type":  "application/json",
      "Accept": "application/json"
  },
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10
}, function(error, response, body) {
  // var jsonRes = JSON.parse(body);
   console.log(body);
   console.log(error);
   res.json(body);
});





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
