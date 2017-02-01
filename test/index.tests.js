var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');

describe('GET /', function() {
    it('should return a 200 response', function(done) {
        request(app).get('/')
            .expect(200, done);
    });
});

describe('GET /*', function() {
    it('should return html', function(done) {
        request(app).get('/*')
            .end(function(err, response) {
                expect(response.type, 'text/html');
                done();
            });
    });
});

describe('GET Unauthorized', function(){
    it('should return a message token needed', function(done){
        request(app).get('/api/users')
        .end(function(err, response){
            expect(response.body.message,"You need an authorization token to view this information.");
            done();
        });
    });
});

describe('POST /api/auth', function(){
    it('should return message User not found', function(done){
        request(app).post('/api/auth')
        .send({email:"this is wrong", password: "no,this is patrick"})
        .end(function(err,response){
            expect(response.body.message, 'User not found');
            done();
        });
    });
    it('should return message User not authenticated', function(done){
        request(app).post('/api/auth')
        .send({email:"nottest@test.com", password: "no,this is patrick"})
        .end(function(err,response){
            expect(response.body.message, 'User not authenticated');
            done();
        });
    });
    it('should return 200 response and token', function(done){
        request(app).post('/api/auth')
        .send({email:"nottest@test.com", password: "newpassword"})
        .end(function(err,response){
            expect(200);
            expect(response.body.token);
            done();
        });
    });
});
