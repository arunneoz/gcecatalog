angular.module('cards')
    .controller('CreditCardCtrl', ['$scope', '$location', '$localStorage', '$window', 'CreditcardsService',    function ($scope, $location,$localStorage, $window,CreditcardsService) {




// get all Prescriptions for Patient

  $scope.getAccountDetails = function () {

    // initial values
   //$localStorage.divId="form";


  console.log(" Going to get Account Details " + 123456789);

    CreditcardsService.getAccountDetails('123456789')


      // handle success
      .then(function (response) {
         //angular.toJson(response.data.transactions);
        console.log(process.env.DATABASE_SERVICE_NAME);
        $scope.loading = false;
        $scope.transactions = response.data.transactions;
        console.log("Received from CreditCardService" + $scope.transactions);
        //$scope.searchForm = {};
      })
      // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Something went wrong!";
        $scope.disabled = false;
        //$scope.searchForm = {};
      });

  };




}]);
