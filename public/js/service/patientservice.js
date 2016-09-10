angular.module('pharmFE').factory('PatientService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    return ({
      searchbyName: searchbyName,
      getPatientinSession: getPatientinSession,
      getDEABlackList: getDEABlackList
    });

    function searchbyName(name) {
      console.log(" In service" + name);
       return $http.get('/ecomm/api/searchpatients/'+name);
    }

    function getPatientinSession() {
    //  console.log(" In service" + name);
       return $http.get('/ecomm/api/getpatient/');
    }

    function getDEABlackList(deaNumber) {
    //  console.log(" In service" + name);
       return $http.get('/ecomm/api/verifydea/'+deaNumber);
    }



}]);
