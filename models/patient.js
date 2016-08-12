
// Dependencies

var mongoose =require('mongoose');

// Schema
var patientSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    dlnumber: String,
    dob: String,
    insuranceId: String

});

// Return model
module.exports = mongoose.model('Patient', patientSchema);
