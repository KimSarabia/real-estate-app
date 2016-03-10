'use strict';
var $this;


var app = angular.module('myApp', []);
app.controller('mainCtrl', function($scope, $http) {

  $scope.transactions = [];

  function getTransactions() {
    $http({
      method: 'GET',
      url: '/banking'
    })
    .then(function (res) {
      $scope.transactions = res.data;
    }, function (err) {
      console.err('ERR', err);
    });
  }
  getTransactions();

  $scope.showTotal = function() {
    var total = 0;
    for(var i = 0; i < $scope.transactions.length; i++) {
      var item = $scope.transactions[i];
      total += item.amount;
    }
    return total;
  }

  $scope.addTransaction = function() {
      var newTransaction = angular.copy($scope.trans);

      if(newTransaction.type === 'Withdrawal'){
        newTransaction.amount = -newTransaction.amount
      }
      $http({
        method: 'POST',
        url: '/banking',
        data: $scope.trans
      })
      .then(function (res) {
        $scope.transactions.unshift(newTransaction);
      }, function(err) {
        console.error(err);
      });
      $scope.trans = {};
    }


  $scope.removeTransaction = function() {
      $this = this;
      var id = $this.trans.id;
      $http({
        method: "DELETE",
        url: `/banking/${id}`,
      })
      .then(function(res) {
        getTransactions();
      }, function(err){
        console.errror(err);
      })
    }
})