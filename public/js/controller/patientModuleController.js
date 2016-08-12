angular.module('pharmFE')
    .controller('PatientCtrl', ['$scope', '$location', 'PatientService',
    function ($scope, $location, PatientService) {

     //$scope.startDate = new Date();
      $scope.getPatient = function() {
          $scope.patient = PatientService.getPatientinSession();
    };

    $scope.init = function () {
    // check if there is query in url
    // and fire search in case its value is not empty

    //$scope.patient = PatientService.getPatientinSession();
    $scope.drugs = ["Hydrocodone-Acetaminophen", "Simvastatin", "Lisinopril", "Omeprazole", "Amlodipine Besylate", "Levothyroxine Sodium",
     "Atorvastatin Calcium", "Azithromycin", "Furosemide", "Ciprofloxacin HCL", "Prednisone", "Metformin HCL",
     "Amoxicillin", "Metoprolol Tartrate", "Tramadol"];
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



    $scope.searchPatient = function () {

      // initial values

    console.log(" In controller" + $scope.patient);
      $scope.error = false;
      $scope.disabled = true;
      // call patient  service
      PatientService.searchbyName($scope.patient)
        // handle success
        .then(function (data) {
          $scope.patients = data;
          $scope.loading = false;
          console.log("Received from PatientService" + angular.toJson(data));
          $scope.searchForm = {};
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
