'use strict';

var path = require('path');
var uuid = require('uuid');
var fs = require('fs');

var transactionsFile = path.join(__dirname, '../data/activity.json');


exports.get = function(cb) {
  fs.readFile(transactionsFile, function(err, data) {
   if(err) return cb(err);
    var transactions = JSON.parse(data);
    cb(null, transactions);
  })
}

exports.add = function(newTrans, cb) {
  this.get((err, transactions ) => {
    if(err) return cb(err);
    newTrans.id = uuid();

    transactions.push(newTrans);
    this.write(transactions, cb)
  })
}

exports.delete = function(id, cb) {
  this.get((err, transactions) => {
    var length = transactions.length;
    transactions = transactions.filter(function(trans) {
      return trans.id !== id;
    })
    if(length === transactions.length) return cb({err: "Transaction not found."});
    this.write(transactions, cb);
  })
}

exports.write = function(transactions, cb) {
  fs.writeFile(transactionsFile, JSON.stringify(transactions), cb)
}