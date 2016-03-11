'use strict';

var app = angular.module('homeApp');

app.service('HomeService', function($http){

  this.getAll = function(){
    return $http.get('/homes')
  };

  this.create = function(newHome){
    return $http.post('/homes', newHome);
  }

  this.delete = function(home) {
   return $http.delete(`/homes/${home.id}`)


 };

 this.update = function(editHome){
    return $http.put('/homes', editHome);
};
})
