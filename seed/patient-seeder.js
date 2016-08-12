var Patient = require('../models/patient');

var mongoose = require('mongoose');

var mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"] || 'localhost';
var mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"] || 27017;

mongoose.connect('mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@'+mongoHost+':'+mongoPort+'/'+process.env.MONGODB_DATABASE);

var patient = [
    new Patient({
      id: '123',
      name: 'Arun Kumar',
      age: 37,
      dlnumber: 's2345678909',
      dob: '10/09/1980',
      insuranceId: 'A0001'
    }),
    new Patient({
      id: '124',
      name: 'John Doe',
      age: 37,
      dlnumber: 's2345678910',
      dob: '10/09/1981',
      insuranceId: 'A0002'
    }),
    new Patient({
      id: '125',
      name: 'Patrick Chen',
      age: 45,
      dlnumber: 's2345678919',
      dob: '10/09/1975',
      insuranceId: 'A0003'
    }),
    new Patient({
      id: '126',
      name: 'John Deere',
      age: 36,
      dlnumber: 's2345678929',
      dob: '10/09/1988',
      insuranceId: 'A0004'
    })
];

var done = 0;
for (var i = 0; i < patient.length; i++) {
    patient[i].save(function(err, result) {
        done++;
        if (done === patient.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
