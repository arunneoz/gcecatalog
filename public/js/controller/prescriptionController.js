angular.module('pharmFE')
    .controller('PrescriptionCtrl', ['$scope', '$location', '$localStorage', '$window', 'PharmacyService', 'PatientService',    function ($scope, $location,$localStorage, $window,PharmacyService,PatientService) {


  /*  $scope.init = function () {
    // check if there is query in url
    // and fire search in case its value is not empty

    //$scope.patient = PatientService.getPatientinSession();
    //console.log ( "Retrieving scope div:" + $scope.divId);
    /*if ($scope.div == "prescription")
    {
      $scope.divId="prescription";
    }
    else {
      $scope.divId="form";
    }


    $scope.divId="form";
    console.log ( "Retrieving scope div:" + $scope.divId);
    console.log ( "Retrieving scope div:" + $scope.div);

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

      });

  };*/

// get all Prescriptions for Patient

  $scope.getPrescriptions = function () {

    // initial values
   //$localStorage.divId="form";


  console.log(" Going to Retrieve Prescriptions for " + $localStorage.pId);

    PharmacyService.getPrescriptioninSession($localStorage.pId)
      // handle success
      .then(function (data) {
        $scope.prescriptions = data;
        $scope.loading = false;
        console.log("Received from PharmacyService" + angular.toJson(data));
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


// createPrescription controller

  $scope.createPrescription = function(){

    $localStorage.divId="form";
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
        //$scope.searchForm = {};
      });



    PharmacyService.createPrescription($scope.prescriptionForm.drugName,$scope.prescriptionForm.startDate,
                                       $scope.prescriptionForm.dea,$scope.prescriptionForm.docName,
                                       $scope.prescriptionForm.routeCode,$scope.prescriptionForm.dosage,
                                       $scope.prescriptionForm.dosageUnits,$scope.prescriptionForm.drugDuration,
                                       $scope.prescriptionForm.drugFreq,$scope.prescriptionForm.cdrugquantity,
                                       $scope.prescriptionForm.cdrugunits,$scope.spatient.data[0].id,$scope.prescriptionForm.patientInstructions,
                                       $scope.prescriptionForm.pharmacistInstructions)

                                       // handle success
                                       .then(function (data) {

                                           //$scope.div="prescription";
                                           $localStorage.divId="prescription";
                                           $localStorage.pId = $scope.spatient.data[0].id;
                                           //$rootScope.divId = "prescription";
                                           console.log ( "Setting scope div:" + $localStorage.divId);
                                           console.log("Retrieved from Session" + angular.toJson(data));
                                           //$location.path('/').replace();
                                           $window.location.reload();
                                           //$scope.apply();


                                       //  $scope.loading = false;

                                         //$scope.searchForm = {};
                                       })
                                       // handle error
                                       .catch(function () {
                                         $scope.error = true;
                                         $scope.errorMessage = "Something went wrong!";
                                         $scope.disabled = false;
                                         $scope.prescriptionForm = {};
                                         alert("Failed submitting the Prescription, please try again");
                                       });





  };



// Added the Scope Watch for Drug to prepopulate other form elements for faster demo.


$scope.$watch(function () {
   return $scope.prescriptionForm.drugName;
},
function (newValue, oldValue) {
  var m = moment().format("MM/DD/YYYY");
   $scope.prescriptionForm.startDate = m;
   $scope.prescriptionForm.dosage = 10;
   $scope.prescriptionForm.dosageUnits = "mg";
   $scope.prescriptionForm.routeCode="PO";
}, true);



/*$scope.$watch(function () {
 return $scope.prescriptionForm.drugFreq;
},
function (newValue, oldValue) {
$scope.prescriptionForm.cdrugquantity = $scope.prescriptionForm.drugFreq;
$scope.prescriptionForm.cdrugunits = "mg";
}, true);*/


$scope.$watchGroup(
      [function () { return $scope.prescriptionForm.drugFreq; },
       function () { return $scope.prescriptionForm.drugDuration; },
       function () {return $scope.prescriptionForm.drugName;
       }],
       function (newVal, oldVal, scope)
       {
        // $scope.prescriptionForm.cdrugquantity = $scope.prescriptionForm.drugFreq * $scope.prescriptionForm.drugDuration;


          PharmacyService.calculateQty($scope.prescriptionForm.drugName,$scope.prescriptionForm.drugDuration,$scope.prescriptionForm.drugFreq)
            // handle success
            .then(function (data) {
              console.log("Retrieved Data from Qty Service" +data.data.qty);
              $scope.calculateQty = parseInt(data.data.qty,10);
            //  $scope.loading = false;
              console.log("Retrieved from Drug Utilization Review" + $scope.calculateQty);
              $scope.prescriptionForm.cdrugquantity = $scope.calculateQty;
              //$scope.searchForm = {};
            })
            // handle error
            .catch(function () {
              $scope.error = true;
              $scope.errorMessage = "Something went wrong!";

            });



         $scope.prescriptionForm.cdrugunits = "mg";


       }, true);



}]);
