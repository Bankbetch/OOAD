process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Blob = require("../server/models/blob");

var should = chai.should();
chai.use(chaiHttp);


describe('Blobs', function() {

  Blob.collection.drop();

  beforeEach(function(done){
    var newBlob = new Blob({
      name: 'admin',
      surname: 'admin',
      username: 'admin',
      password: '12345678',
      types: 'เจ้าหน้าที่',
      email: 'kenny@gmail.com'
    });
    newBlob.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Blob.collection.drop();
    done();
  });

  it('should list ALL blobs on /blobs GET', function(done) {
    chai.request(server)
      .get('/blobs')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('admin');
        done();
      });
  });

  it('should list a SINGLE blob on /blob/<id> GET', function(done) {
      var newBlob = new Blob({
      name: 'Nuttapus',
      surname: 'Worarattanadechai',
      username: '59160561',
      password: '59160561',
      types: 'นิสิต',
      email: 'kenny@gmail.com'
      });
      newBlob.save(function(err, data) {
        chai.request(server)
          .get('/blob/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('types');
            res.body.name.should.equal('Nuttapus');
            res.body.types.should.equal('นิสิต');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });

  it('should add a SINGLE blob on /blobs POST add' , function(done) {
    chai.request(server)
      .post('/blobs')
      .send({'name': 'TEerifle', 'surname': 'Mairu' , 'username': '59161001' , 'password':'123456789', 'types': 'นิสิต', 'email': 'kenny@gmail.com'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('surname');
        res.body.SUCCESS.should.have.property('username');
        res.body.SUCCESS.should.have.property('password');
        res.body.SUCCESS.should.have.property('types');
        res.body.SUCCESS.should.have.property('email');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('TEerifle');
        res.body.SUCCESS.surname.should.equal('Mairu');
        res.body.SUCCESS.username.should.equal('59161001');
        res.body.SUCCESS.password.should.equal('123456789');
        res.body.SUCCESS.types.should.equal('นิสิต');
        res.body.SUCCESS.email.should.equal('kenny@gmail.com');
        
        done();
      });
  });

  it('should update a SINGLE blob on /blob/<id> PUT update', function(done) {
    chai.request(server)
      .get('/blobs')
      .end(function(err, res){
        chai.request(server)
          .put('/blob/'+res.body[0]._id)
          .send({'name': 'TEerifle'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.name.should.equal('TEerifle');
            done();
        });
      });
  });

    it('should delete a SINGLE blob on /blob/<id> DELETE', function(done) {
    chai.request(server)
      .get('/blobs')
      .end(function(err, res){
        chai.request(server)
          .delete('/blob/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('name');
            response.body.REMOVED.should.have.property('_id');
            response.body.REMOVED.name.should.equal('admin');
            done();
        });
      });
  }); 
 
});
