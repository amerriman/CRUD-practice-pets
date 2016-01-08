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
          console.log(res, "RES");
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

  it('it should list a single pet on GET', function(done){
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
          res.body.name.should.equal('Alice')
          done();
        });
    });
  });







});
