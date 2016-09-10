
var mongoose =require('mongoose');

var alert =  new mongoose.Schema({
prescriptionId: String,
alertId: String,
alertName: String,
alertType: String,
alertStatus: String,
alertDate: String

});

// Return model
module.exports = mongoose.model('PrescriptionAlerts', alert);
