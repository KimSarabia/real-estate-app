var express = require('express');
var router = express.Router();

var Home = require('../models/home');

router.get('/', (req, res) => {
  Home.get(function(err, homes){
    if(err){
     res.status(400).send(err);
     return;
   }
   res.send(homes);
 });
});

router.put('/', (req, res) => {

  Home.put(req.body, function(err, homes){
    if(err){
     res.status(400).send(err);
     return;
   }
   res.send(homes);
 });
});

router.post('/', (req, res) => {
  var newHome = req.body;
  Home.create(newHome, function(err, savedHome){
    if(err){
     res.status(455).send(err);
   } 
   else {
    res.send(newHome)
  }
 });
});

router.delete('/:id', function(req, res){
  var id = req.params.id; 
  console.log('id', id)
  Home.delete(id, function(err){
    if(err){
      res.status(400).send(err);
      return;
    } else {
      res.send();
    }
  });
});

module.exports = router;