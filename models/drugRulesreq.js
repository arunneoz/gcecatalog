var DURRequestSchema = require('node-schema-object');


var DURRequest = new DURRequestSchema({

  id: String,
  name: String,
  medications: {type: Array, unique: true, arrayType: Drug},
  prescription: Prescription

});

var Drug = new DURRequestSchema({
   name: String

});

var Prescription = new DURRequestSchema({
   id: String,
   drugName: String,
   drugDose: Number,
   drugFreq: Number

});
