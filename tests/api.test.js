const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  let id;
  const client = {
    name: 'Davi',
    cpf: '97844632140',
    email: 'daviii@gamil.com',
    phone: '988884444',
    office: 'Policial',
    policeStation: 'DPSS',
    city: 'brasília',
  };
  const token = jwt.sign({
    name: 'Test',
    cpf: '12345678911',
    email: 'test@hotmail.com',
    phone: '988884444',
    office: 'Policial',
    policeStation: 'DPSS',
    city: 'brasilia',
  }, process.env.SECRET, {
    expiresIn: 240,
  });

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  // creat client
  it('Post client', async (done) => {
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(client);
    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe(client.phone);
    expect(res.body.cpf).toBe(client.cpf);
    expect(res.body.name).toBe(client.name);
    expect(res.body.email).toBe(client.email);
    expect(res.body.policeStation).toBe(client.policeStation);
    expect(res.body.city).toBe(client.city);
    expect(res.body.office).toBe(client.office);
    id = res.body._id;
    done();
  });

  it('Post client error', async (done) => {
    const errorClient = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      office: '',
      policeStation: '',
      city: ''
    };
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(errorClient);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(["invalid name", "invalid cpf", "invalid email","invalid phone", "invalid office", "invalid police station", "invalid city"]);
    done();
  });

  // get client
  it('Get clients', async (done) => {
    const res = await request(app).get('/clients/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe(res.body[0].name);
    expect(res.body[0].cpf).toBe(res.body[0].cpf);
    expect(res.body[0].email).toBe(res.body[0].email);
    expect(res.body[0].phone).toBe(res.body[0].phone);
    expect(res.body[0].office).toBe(res.body[0].office);
    expect(res.body[0].policeStation).toBe(res.body[0].policeStation);
    expect(res.body[0].city).toBe(res.body[0].city);
    expect(res.body[0].active).toBe(true);
    done();
  });

  it('Get actived clients', async (done) => {
    const res = await request(app).get('/clients?active=false').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].city).toBe(res.body[0].city);
    expect(res.body[0].policeStation).toBe(res.body[0].policeStation);
    expect(res.body[0].email).toBe(res.body[0].email);
    expect(res.body[0].office).toBe(res.body[0].office);
    expect(res.body[0].cpf).toBe(res.body[0].cpf);
    expect(res.body[0].name).toBe(res.body[0].name);
    expect(res.body[0].phone).toBe(res.body[0].phone);
    expect(res.body[0].active).toBe(false);
    done();
  });

});

afterAll(async (done) => {
  done();
});
