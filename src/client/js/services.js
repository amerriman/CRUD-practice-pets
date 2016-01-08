app.factory('httpFactory', ['$http', function($http){

  var routing = {};

  routing.get = function(url){
    return $http.get(url);
  };

  routing.post = function(url, payload){
    return $http.post(url, payload);
  };

  routing.put = function(url, payload){
    return $http.put(url, payload);
  };

  routing.delete = function(url){
    return $http.delete(url);
  };


  return routing;

}]);
