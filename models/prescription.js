
// Dependencies

var mongoose =require('mongoose');

// Schema
var prescriptionSchema = new mongoose.Schema({
    id: String,
    patientid: String,
    drugname: String,
    drugqty: Number,
    drugdose: Number,
    drugFreq: Number,
    drugUnits: Number,
    deanumber: String,
    insuranceId: String

});

// Return model
module.exports = mongoose.model('Prescription', prescriptionSchema);
