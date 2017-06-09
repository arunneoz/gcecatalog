var app = angular.module('gcecatalog', ['ui.bootstrap']);

app.controller('autocompleteController', function($scope, $http) {
  getProducts(); // Load all countries with capitals
  function getProducts(){

    productname=$scope.selectedProducts;
    //data1='{"countries":[{"name" : "Afghanistan"},{"name" : "Albania"},{"name" : "Algeria"},{"name" : "American Samoa"}]}';
//Firebase
    /*var scoresRef = new Firebase("https://api-project-512905136375.firebaseio.com/product");
    scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + (data.val().name));
    });
  });*/

// BigTable via BigQuery

  $http.get("http://localhost:8081/ecomm/api/getProducts/"+productname).success(function(data){
        //$scope.countries = data;
        //console.log(angular.fromJson(data));
        $scope.products = data;
      //  angular.copy(data, $scope.products);
      });
  //$scope.countries=angular.fromJson(data1).countries;

  console.log('Products Name ' + $scope.products);
  //console.log($scope.products[0].name);
  };

  $scope.$watch('selectedProducts', function (nval, oval) {
          if (oval !== nval) {
              getProducts();
          }
      });
});
