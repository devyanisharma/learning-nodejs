const request = require("supertest");
const { app } = require('../app');


describe("testing get request", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get('/api/user/')
      .then(response => {
        console.log(response.statusCode);
        if(response.body.data.length >=1){
        expect(response.statusCode).toBe(200);
      }else{
        expect(response.statusCode).toBe(204);
      }
      });
  });
});

describe("testing post request", () => {
  test("It should response the created post", () => {
    return request(app)
      .post('/api/user/')
      .send({
        "name": "shivangi",
        "age": "23",
        "email": "shivu@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response.statusCode)
        expect(response.statusCode).toBe(201);
      });
  });
});

describe("testing post request with incomplete body", () => {
  test("It should throw forbidden request", () => {
    return request(app)
      .post('/api/user/')
      .send({
        "name": "shivangi",
        "email": "shivu@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response.statusCode)
        expect(response.statusCode).toBe(401);
      });
  });
});

describe("testing put request with complete body", () => {
  test('It should give success response', () => {
    return request(app)
      .put('/api/user/90')
      .send({
        "name": "shivangput",
        "age": "20",
        "email": "shivput@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.statusCode).toBe(202);
      });
  });
});

describe("testing put request with incomplete body", () => {
  test('It should give error forbidden response', () => {
    return request(app)
      .put('/api/user/90')
      .send({
        "name": "shivangput",
        "email": "shivput@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("testing patch request with correct request", () => {
  test("It should return success output", () => {
    return request(app)
      .patch('/api/user/90')
      .send({
        "userName": "shivangput",
        "userEmail": "shivput@gmail.com"
      })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.statusCode).toBe(202)
      });
  });
});

describe("testing patch request with incorrect Key", () => {
  test("It should return error output", () => {
    return request(app)
      .patch('/api/user/90')
      .send({
        "name": "shivangput",
        "email": "shivput@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.statusCode).toBe(401)
      })
  })
})

describe("testing patch request with incorrect id", () => {
  test("It should return error output", () => {
    return request(app)
      .patch('/api/user/5')
      .send({
        "userName": "shivangput",
        "userEmail": "shivput@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.statusCode).toBe(400)
      })
  })
})

describe("delete request with correct id", () => {
  test("It should return success response", () => {
    return request(app)
      .delete('/api/user/90')
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })
})

describe("delete request with incorrect id", () => {
  test("It should return error response", () => {
    return request(app)
      .delete('/api/user/10')
      .then(response => {
        expect(response.statusCode).toBe(401)
      })
  })
})


