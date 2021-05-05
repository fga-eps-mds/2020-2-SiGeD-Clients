const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  const token = jwt.sign({
    name: 'Test',
    description: 'jest',
    color: 'red',
  }, process.env.SECRET, {
    expiresIn: 240,
  });

  const feature = {
    name: 'old',
    description: 'privilegs',
    color: 'blue',
  }

  let ID;

  it('Post feature', async (done) => {
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(feature);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(feature.name);
    expect(res.body.description).toBe(feature.description);
    expect(res.body.color).toBe(feature.color);
    ID = res.body._id;
    done();
  });

  it('Post feature with invalid name', async (done) => {
    const invalidFeature = {
      name: '',
      description: 'privilegs',
      color: 'blue',
    };
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(invalidFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message": ["invalid name"]});
    done();
  });

  it('Post invalidFeature with invalid description', async (done) => {
    const invalidFeature = {
      name: 'familiar',
      description: '',
      color: 'yellow',
    }
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(invalidFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message": ['invalid description']});
    done();
  });

  it('Post feature with invalid color', async (done) => {
    const invalidFeature = {
      name: 'VIP',
      description: 'very important member',
      color: '',
    }
    const res = await request(app).post('/feature/create/').set('x-access-token', token).send(invalidFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message": ['invalid color']});
    done();
  });

  it('Post feature invalid token', async (done) => {
    const res = await request(app).post('/feature/create/').set('x-access-token', 'invalidToken').send(feature);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({"auth": false, "message": "The token could not be authenticated."})
    done();
  });

  it('Post feature without token', async (done) => {
    const res = await request(app).post('/feature/create/').send(feature);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ "auth": false, "message": "No token was provided." })
    done();
  });

  it('Get feature', async (done) => {
    const res = await request(app).get('/features/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    const lastIdx = res.body.length - 1;
    expect(res.body[lastIdx].name).toBe(feature.name);
    expect(res.body[lastIdx].description).toBe(feature.description);
    expect(res.body[lastIdx].color).toBe(feature.color);
    done();
  })

  it('Get feature with invalid token', async (done) => {
    const res = await request(app).get('/features/').set('x-access-token', 'invalidToken');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({"auth": false, "message": "The token could not be authenticated."})
    done();
  })

  it('Get feature without token', async (done) => {
    const res = await request(app).get('/features/');
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ "auth": false, "message": "No token was provided." })
    done();
  })

  it('Put feature', async (done) => {
    const editFeature = {
      name: 'sick',
      description: 'rest in peace',
      color: 'black',
    }
    const res = await request(app).put(`/feature/update/${ID}`).set('x-access-token', token).send(editFeature);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(editFeature.name);
    expect(res.body.description).toBe(editFeature.description);
    expect(res.body.color).toBe(editFeature.color);
    done();
  })

  it('Put feature with invalids inputs', async (done) => {
    const editFeature = {
      name: '',
      description: '',
      color: '',
    }
    const res = await request(app).put(`/feature/update/${ID}`).set('x-access-token', token).send(editFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message": ['invalid name', 'invalid description', 'invalid color']});
    done();
  })

  it('Put feature with invalid token', async (done) => {
    const editFeature = {
      name: 'sick',
      description: 'rest in peace',
      color: 'black',
    }
    const res = await request(app).put(`/feature/update/${ID}`).set('x-access-token', 'invalidToken').send(editFeature);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({"auth": false, "message": "The token could not be authenticated."})
    done();
  })

  it('Put feature without token', async (done) => {
    const editFeature = {
      name: 'sick',
      description: 'rest in peace',
      color: 'black',
    }
    const res = await request(app).put(`/feature/update/${ID}`).send(editFeature);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ "auth": false, "message": "No token was provided." })
    done();
  })

  it('Put feature with invalid ID', async (done) => {
    const editFeature = {
      name: 'sick',
      description: 'rest in peace',
      color: 'black',
    }
    const res = await request(app).put(`/feature/update/false`).set('x-access-token', token).send(editFeature);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Invalid ID" })
    done();
  })
  
  it('delete feature', async (done) => {
    const res = await request(app).delete(`/feature/delete/${ID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"message": "success"});
    done();
  })

  it('delete feature with invalid ID', async (done) => {
    const res = await request(app).delete('/feature/delete/false').set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message": "Invalid ID"});
    done();
  })

});

afterAll(async (done) => {
  done();
});