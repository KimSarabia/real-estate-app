'use strict';

var express = require('express');
var router = express.Router();

var Bank = require('../models/bank');

router.get('/', function(req, res) {

  Bank.get(function(err, transactions){
    if(err) return res.status(400).send(err);
    res.send(transactions);
  })
})

router.post('/', function(req, res) {
  var newTrans = req.body;

  Bank.add(newTrans, function(err) {
    res.send(newTrans);
  })
})

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Bank.delete(id, function(err) {
    if(err) return res.status(400).send(err);
    res.send();
  })
})

module.exports = router;