angular.module('pharmFE').factory('PatientService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    return ({
      searchbyName: searchbyName,
      getPatientinSession: getPatientinSession
    });

    function searchbyName(name) {
      console.log(" In service" + name);
       return $http.get('/ecomm/api/searchpatients/'+name);
    }

    function getPatientinSession() {
    //  console.log(" In service" + name);
       return $http.get('/ecomm/api/getpatient/');
    }



}]);
