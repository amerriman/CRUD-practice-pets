process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app.js');

var Pet = require('../src/server/models/pets');


var should = chai.should();
chai.use(chaiHttp);


describe('Pet', function(){

  beforeEach(function(done){
    Pet.collection.drop();
    var testPet = new Pet({
      name: "Fido",
      type: "Dog",
      age: 4
      });
    testPet.save(function(err, pet){
      done();
    });
  });

  afterEach(function(done){
    Pet.collection.drop();
    done();
  });


  it('should list all pets on GET', function(done){
    var secondPet = new Pet({
      name: 'Sasha',
      type: 'Cat',
      age: 6
    });
    secondPet.save(function(err, data){
      chai.request(server)
        .get('/api/pets')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          // console.log(res.body, "RES");
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('age');
          res.body[0].name.should.equal('Fido');
          res.body[1].type.should.equal('Cat');
          done();
        });
    });
  });


  it('it should list a single pet on /api/pet/:id GET', function(done){
    var anotherPet = new Pet({
      name: 'Alice',
      type: 'Cat',
      age: 6
    });
    anotherPet.save(function(err, data){
      chai.request(server)
        .get('/api/pet/' + data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('age');
          res.body.name.should.equal('Alice');
          done();
        });
    });
  });

//can also just create a newPet as above, and .send(newPet)
  it('it should add a pet on /api/pets POST', function(done){
    chai.request(server)
    .post('/api/pets')
    .send({
      'name': 'Chaucer',
      'type': 'Dog',
      'age': 12
    })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.name.should.equal('Chaucer');
      done();
    });
  });


  it('it should update a pet on /api/pet/:id PUT', function(done){
    chai.request(server)
    .get('/api/pets')
    .end(function(err, res){
      chai.request(server)
        .put('/api/pet/' + res.body[0]._id)
        .send({'name': 'Fred', 'type': 'Cat', 'age': 6})
        .end(function(error, res){
          res.should.have.status(200);
          res.should.be.json;
          console.log(res.body)
          res.body.should.be.a('object');
          res.body.UPDATED.should.be.a('object');
          res.body.UPDATED.should.have.property('name');
          res.body.UPDATED.name.should.equal('Fred');
          res.body.UPDATED.type.should.equal('Cat');
          done();
        });
    });
  });


  it('it should delete a pet on /api/pet/:id DELETE', function(done){
    chai.request(server)
      .get('/api/pets')
      .end(function(err, res){
        chai.request(server)
        .delete('/api/pet/' + res.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('REMOVED');
          res.body.REMOVED.should.be.a('object');
          res.body.REMOVED.should.have.property('name');
          res.body.REMOVED.should.have.property('_id');
          res.body.REMOVED.name.should.equal('Fido');
          done();
        });
      });
  });



});














