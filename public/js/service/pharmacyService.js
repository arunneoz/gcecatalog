angular.module('pharmFE').factory('PharmacyService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {
    var divId = "";

    return ({
      searchbyName: searchbyName,
      getPrescriptioninSession: getPrescriptioninSession,
      getDEABlackList: getDEABlackList,
      calculateQty: calculateQty,
      createPrescription:createPrescription,
      getPrescriptioninSession: getPrescriptioninSession
    });

    function searchbyName(name) {
      console.log(" In service" + name);
       return $http.get('/ecomm/api/searchpatients/'+name);
    }


  

    function getPrescriptioninSession(pId) {
    //  console.log(" In service" + name);
      console.log(" In Rx service" + pId);
      return $http.get('/ecomm/api/getPrescriptions/'+pId);
    }

    function createPrescription(drugName,startDate,deaNumber,docName,routeCode,dose,doseUnits,duration,freq,totalQty,drugCUnits,patientId,patientInstructions,pharmacistInstructions) {

      // send a post request to the server

      console.log(" Creating Prescription for Patient "+ patientId);

      var data = $.param({
                 drugName: drugName,
                 startDate: startDate,
                 deaNumber: deaNumber,
                 docName: docName,
                 routeCode: routeCode,
                 dose: dose,
                 doseUnits: doseUnits,
                 duration: duration,
                 freq: freq,
                 totalQty: totalQty,
                 drugCUnits: drugCUnits,
                 patientId: patientId,
                 patientInstructions: patientInstructions,
                 pharmacistInstructions: pharmacistInstructions
             });

             var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 }
             }



    return $http.post('/ecomm/api/createPrescription',data,config)


    }

    function calculateQty(drugName,duration,freq) {
     console.log(" Getting Qty for "+ duration);

     var data = $.param({
                drugName: drugName,
                duration: duration,
                freq: freq
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
      // send a post request to the server
    return $http.post('/ecomm/api/calculateQty',data,config);


    }


    function getDEABlackList(deaNumber) {
    //  console.log(" In service" + name);
       return $http.get('/ecomm/api/verifydea/'+deaNumber);
    }




}]);
