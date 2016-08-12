angular.module('pharmFE').factory('PharmacyService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    return ({
      searchbyName: searchbyName,
      getPrescriptioninSession: getPrescriptioninSession
    });

    function searchbyName(name) {
      console.log(" In service" + name);
       return $http.get('/ecomm/api/searchpatients/'+name);
    }

    function getPrescriptioninSession(rxId) {
    //  console.log(" In service" + name);
      console.log(" In Rx service" + rxId);
      return $http.get('/ecomm/api/getprescription/'+rxId);
    }

    function createPrescription(drugName,deaNumber,docName,dose,doseUnits,totalQty,freq,patientId) {

      // send a post request to the server
    return $http.post('/ecomm/api/createPrescription',
        {drugName: drugName, deaNumber: deaNumber,docName:docName,dose:dose,doseUnits:doseUnits,totalQty:totalQty,freq:freq,patientId:patientId})


    }

    function calculateQty(drugName,dose,doseUnits,freq) {

      // send a post request to the server
    return $http.post('/ecomm/api/calculateQty',
        {drugName: drugName,dose:dose,doseUnits:doseUnits,freq:freq})

    }


    function verifyDEA(deaNumber,docName) {

      // send a post request to the server
    return $http.post('/ecomm/api/verifyDEA',
        {deaNumber: deaNumber,docName:docName})

    }




}]);
