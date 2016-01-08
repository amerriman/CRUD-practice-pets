app.directive('petTable', function(){
  return {
    restrict: 'E',
    templateUrl: '/table/pet-table.html',
    controller: ['$scope', '$http', 'httpFactory', function ($scope, $http, httpFactory){


      getPets = function(url){
        httpFactory.get(url)
        .then(function(response){
          $scope.pets = response.data;
          // console.log($scope.pets, "scope pets");
        });
      };
      getPets('api/pets');

      $scope.deletePet = function(id) {
        httpFactory.delete('api/pet/' + id)
        .then(function(response){
          console.log(response, "DELETE RESPONSE");
          getPets('api/pets');
        });
      };

      $scope.editPet = function(name, type, age, id){
        var payload = {
          'name': name,
          'type': type,
          'age': age
        };
        httpFactory.put('api/pet/'+id, payload)
        .then(function(response){
          console.log(response.data, "edit response");
          getPets('api/pets');
        });
      };




    }]
  };
});
