const request = require("supertest");
const {app} = require('../app');

describe("testing get request",()=>{
  test("It should response the GET method", () => {
    return request(app)
        .get("/api/user/")
        .then(response => {
          console.log(response.statusCode);
          expect(response.statusCode).toBe(200);
        });
});
});

describe("testing post request",()=>{
  test("It should response the created post",()=>{
    return request(app)
    .post('/api/user/')
    .send({"name":"shivangi",
           "age":"23",
           "email":"shivu@gmail.com"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      console.log(response.statusCode)
      expect(response.statusCode).toBe(201);
    });

  });
});

describe("testing post request with incomplete body",()=>{
  test("It should throw forbidden request",()=>{
    return request(app)
    .post('/api/user/')
    .send({"name":"shivangi",
    "email":"shivu@gmail.com"})
    .set('Accept','application/json')
    .expect('COntent-Type',/json/)
    .then(response=>{
      console.log(response.statusCode)
      expect(response.statusCode).toBe(401);
    });
  });
});

describe("testing put request with complete body",()=>{

});