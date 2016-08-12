angular.module('pharmFE')
    .controller('prescriptionCtrl', ['$scope', '$location', 'PatientService', 'PharmacyService'
    function ($scope, $location, PatientService, PharmacyService) {


    $scope.init = function () {
    // check if there is query in url
    // and fire search in case its value is not empty

    //$scope.patient = PatientService.getPatientinSession();
    $scope.divId="form";
    PatientService.getPatientinSession()
      // handle success
      .then(function (data) {
        $scope.spatient = data;
      //  $scope.loading = false;
        console.log("Retrieved from Session" + angular.toJson(data));
        //$scope.searchForm = {};
      })
      // handle error
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Something went wrong!";
        $scope.disabled = false;
        $scope.searchForm = {};
      });

  };
}]);
