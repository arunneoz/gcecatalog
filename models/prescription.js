
// Dependencies

var mongoose =require('mongoose');

// Schema
var prescriptionSchema = new mongoose.Schema({
    drugname: String,
    startDate: String,
    dea: String,
    docName: String,
    routeCode: String,
    drugdose: Number,
    drugUnits: String,
    drugDuration: Number,
    drugFreq: Number,
    drugQty: Number,
    drugCUnits: String,
    patientInstructions: String,
    pharmacistInstructions: String,
    patientId: String,
    status: String

});





// Return model
module.exports = mongoose.model('Prescription', prescriptionSchema);
