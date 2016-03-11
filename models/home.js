'use strict'

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var homeFilePath = path.join(__dirname, "../data/homes.json")


exports.write = function(homes, cb) {
  fs.writeFile(homeFilePath, JSON.stringify(homes), cb);
};

exports.get = function(cb){
  fs.readFile(homeFilePath, function(err, data){
    if(err) return cb(err);
    var homes = JSON.parse(data);
    cb(null, homes);
  });
}

exports.create = function(newHome, cb) {

  this.get((err, homes) => {
    if(err) return cb(err);
    newHome.id = uuid();
    homes.push(newHome);
    this.write(homes, function(err){
      cb(err, newHome);
    });
  });
};


exports.put = function(editHome, cb){
  this.get((err, homes) => {
    if(err) return cb(err);
    for (var i = 0; i < homes.length; i++){
      if(editHome.id === homes[i].id){
        homes[i] = editHome
      }
    }
    this.write(homes, function(err){
      cb(err, editHome);
    });
  })

}

exports.delete = function(id, cb)  {
  this.get((err, homes) => {
    console.log('export1')
    var length = homes.length
    homes = homes.filter(function(viewHome){
      console.log('export2')
      return viewHome.id !== id;
    });
    if(length === homes.length) {
      cb( {err: "Home not found"});
    }
    this.write(homes, cb);
  });
}
