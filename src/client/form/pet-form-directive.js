app.directive('petForm', function(){
  return {
    restrict:'E',
    templateUrl: '/form/pet-form.html',
    controller: ['$scope', '$http', 'httpFactory', function ($scope, $http, httpFactory){


      $scope.pet = {};


      $scope.registerPet = function(){
        // console.log($scope.pet)
        var payload = $scope.pet;
        httpFactory.post('/api/pets', payload)
        .then(function(response){
          console.log(response, "RESPONSE");
          $scope.pet = {};
          getPets('api/pets');
        })
      };

    }]
  };
});
