var express = require('express');
var router = express.Router();
var Blob = require('../models/blob');

router.get('/', function(req, res, next) {
  res.send('Hello, World!');
});

// *** api routes *** //
router.get('/blobs', findAllBlobs);
router.get('/blob/:id', findBlobById);
router.post('/blobs', addBlob);
router.put('/blob/:id', updateBlob);
router.delete('/blob/:id', deleteBlob);

// *** get ALL blobs *** //
function findAllBlobs(req, res) {
  Blob.find(function(err, blobs) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(blobs);
    }
  });
}

// *** get SINGLE blobs *** //
function findBlobById(req, res) {
  Blob.findById(req.params.id, function(err, blob) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(blob);
    }
  });
}

// *** post ALL blobs *** //
function addBlob(req, res) {
  var newBlob = new Blob({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    password: req.body.password,
    types: req.body.types,
    email: req.body.email

  });
  newBlob.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newBlob});
    }
  });
}

// *** put SINGLE blob *** //
function updateBlob(req, res) {
  Blob.findById(req.params.id, function(err, blob) {
    blob.name = req.body.name;
    blob.surname = req.body.surname;
    blob.username = req.body.username;
    blob.password = req.body.password;
    blob.types = req.body.types;
    blob.email = req.body.email;
    blob.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': blob});
      }
    });
  });
}

// *** delete SINGLE blob *** //
function deleteBlob(req, res) {
  Blob.findById(req.params.id, function(err, blob) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      blob.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': blob});
        }
      });
    }
  });
}

module.exports = router;
