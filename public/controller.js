var app = angular.module('homeApp');

app.controller('homeCtrl', function($scope, HomeService){
  console.log('Yass');

  HomeService.getAll()
  .then(function(res){

    var homes = res.data;
    $scope.homes = homes;

  }, function(err){
    console.log(err);
  });

  $scope.addHome = function(){
    HomeService.create($scope.newHome)
    .then(function(res){
      $scope.homes.push(res.data)
      $scope.newHome = {}
    }, function(err){
      console.log(err)
    }); 
  };

  $scope.viewHome = null

  $scope.seeMore = function(home){
    $scope.viewHome = home;
  }

  $scope.seeLess = function(home){
    $scope.viewHome = null;
  }

  $scope.update = function(viewHome){
    HomeService.update(viewHome)

    .then(function(){
      swal("Success!", "Your home has been saved!")

    }, function(err){
      console.log(err);
    })
  }

  $scope.deleteHome = function(home){
    console.log(1)
    HomeService.delete(home)
    console.log(2)
    .then(function(home){
    //success
    console.log(3)
    var index = $scope.homes.indexOf(home);
    $scope.homes.splice(index, 1);

  }, function(err){
    console.log('err ' , err);
  })
  }
})