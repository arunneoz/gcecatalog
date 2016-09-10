angular.module('pharmFE').directive('autoComplete', function($timeout) {
    return function(scope, elem, attr) {
            elem.autocomplete({
                source: scope[attr.uiItems],
                select: function() {
                    $timeout(function() {
                      elem.trigger('input');
                    }, 0);
                }
            });
    };
});


angular.module('pharmFE').directive('blacklist', function (PharmacyService){
   return {
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {
              var blacklist = "Hello";
              var today = new Date();
              var expiry = null;
              var doc = null;
              // var expiry;

      // scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined; // Check if the string contains digit. Same remark.

                  //blacklist = data.split(',');

              //console.log("Blacklist Data " + blacklist);
              ngModel.$parsers.unshift(function (value) {

                PharmacyService.getDEABlackList(value).success(function(data) {
                   if(data.includes('prescriber') > 0)
                    var res = JSON.parse(data);

                    console.log("Returned Data " + res.prescriber.expiry.trim());

                     expiry = Date.parse(res.prescriber.expiry.trim());
                     scope.doc = res.prescriber.docName.trim();
                      console.log( " Doc Name :" +  scope.doc);
                      var myEl = angular.element( document.querySelector( '#inputDocName' ) );
                      myEl.val( scope.doc);
                    //  console.log("Expired License" + scope.expiry);
                     if(expiry < (new Date(today.getFullYear(), today.getMonth(), today.getDate()+30)))
                     {
                       console.log("Expired License" + expiry);
                     }
                    });
                 scope.deaValidLength = (value && value.length >= 6 ? 'valid' : undefined); // Check the length of the string
                 scope.deaValidExpiry = (value && expiry < (new Date(today.getFullYear(), today.getMonth(), today.getDate()+30)) ? 'valid' : undefined); // Check deaNumber has not expired

                 if(scope.deaValidLength && scope.deaValidExpiry) { // If all is good, then…
                             ngModel.$setValidity('blacklist', true); // Tell the controlller that the value is valid
                             //angular.element("inputDocName").val("arun");
                             //console.log( " Doc Name :" +  scope.doc);

                             //$scope.prescriptionForm.docName = doc;
                              //scope.expiry="";
                             return value; // Return this value (it will be put into the model)
                         } else { // … otherwise…
                             ngModel.$setValidity('blacklist', false); // Tell the controlller that the value is invalid
                             angular.element('#inputDocName').val();
                             //scope.expiry="";
                             return value; // When the value is invalid, we should return `undefined`, as asked by the documentation
                         }


                // ngModel.$setValidity('blacklist', blacklist.indexOf(value) === 0);
                 /*if(expiry > (new Date(today.getFullYear(), today.getMonth(), today.getDate()+30)))
                 {
                   ngModel.$setValidity('blacklist',true);
                 }
                 else {
                   ngModel.$setValidity('blacklist',false);
                 }*/
                // return value;
              });

}
   };
});
