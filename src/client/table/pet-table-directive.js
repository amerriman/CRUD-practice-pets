app.directive('petTable', function(){
  return {
    restrict: 'E',
    templateUrl: '/table/pet-table.html',
    controller: ['$scope', '$http', 'httpFactory', function ($scope, $http, httpFactory){

      getPets = function(url){
        httpFactory.get(url)
        .then(function(response){
          $scope.pets = response.data;
          console.log($scope.pets, "scope pets");
        });
      };
      getPets('api/pets');


    }]
  }
})
