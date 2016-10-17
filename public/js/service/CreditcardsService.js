angular.module('cards').factory('CreditcardsService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {
    var divId = "";

    return ({
      getAccountDetails: getAccountDetails
    });

    function getAccountDetails(id) {
      console.log(" In service" + id);
       return $http.get('http://creditsvc:8080/CardServices/api/getAccounts/'+id);
    }



}]);
