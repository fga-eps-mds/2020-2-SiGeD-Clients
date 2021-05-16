const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  let activeID, notActiveID;

  const client = {
    name: 'Davi Rogerio',
    cpf: '17834632140',
    email: 'davi@gmail.com',
    phone: '988884444',
    secondaryPhone: '988884445',
    office: 'Policial',
    location: 'DPSS',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const falseClient = {
    name: 'Bruno',
    cpf: '17840632141',
    email: 'brunoTI@gmail.com',
    phone: '977854444',
    secondaryPhone: '977854445',
    office: 'Policial',
    location: 'DPSS',
    address: 'Ceilândia',
    userID: '6089c3538dfebe00555bc17e',
    active: false,
  };
  const token = jwt.sign({
    name: 'Test',
    cpf: '12345678911',
    email: 'test@hotmail.com',
    phone: '988884444',
    secondaryPhone: '998888444',
    office: 'Policial',
    location: 'DPSS',
    address: 'brasilia',
    userID: '6089c3538dfebe00555bc17e'
  }, process.env.SECRET, {
    expiresIn: 240,
  });

  const client1 = {
    name: 'Cliente Um',
    cpf: '59812441000',
    email: 'um@gmail.com',
    phone: '988884401',
    secondaryPhone: '988884410',
    office: 'Policial',
    location: 'DPSS',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client2 = {
    name: 'Cliente Dois',
    cpf: '88776555003',
    email: 'dois@gmail.com',
    phone: '988884402',
    secondaryPhone: '988884420',
    office: 'Policial',
    location: 'DPSS',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client3 = {
    name: 'Cliente Três',
    cpf: '19026752075',
    email: 'tres@gmail.com',
    phone: '988884403',
    secondaryPhone: '988884430',
    office: 'Policial',
    location: 'DPSS',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client4 = {
    name: 'Cliente Quatro',
    cpf: '77791867095',
    email: 'quatro@gmail.com',
    phone: '988884404',
    secondaryPhone: '988884440',
    office: 'Policial',
    location: 'DPSS',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };
  const client5 = {
    name: 'Cliente Cinco',
    cpf: '98094963034',
    email: 'cinco@gmail.com',
    phone: '988884405',
    secondaryPhone: '988884450',
    office: 'Policial',
    location: 'DPSS',
    address: 'Brasília',
    userID: '6089c3538dfebe00555bc17e'
  };

  beforeAll(async () => {
    await request(app).post('/clients/create/').set('x-access-token', token).send(client1);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client2);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client3);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client4);
    await request(app).post('/clients/create/').set('x-access-token', token).send(client5);
  })

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  it('Get newest four clients', async (done) => {
    const res = await request(app).get('/clients/newest-four').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(4);
    done();
  });

  it('Post client', async (done) => {
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(client);
    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe(client.phone);
    expect(res.body.secondaryPhone).toBe(client.secondaryPhone);
    expect(res.body.cpf).toBe(client.cpf);
    expect(res.body.name).toBe(client.name);
    expect(res.body.email).toBe(client.email);
    expect(res.body.location).toBe(client.location);
    expect(res.body.address).toBe(client.address);
    expect(res.body.office).toBe(client.office);
    activeID = res.body._id;
    done();
  });

  it('Post false client', async (done) => {
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(falseClient);
    expect(res.statusCode).toBe(200);
    expect(res.body.phone).toBe(falseClient.phone);
    expect(res.body.secondaryPhone).toBe(falseClient.secondaryPhone);
    expect(res.body.cpf).toBe(falseClient.cpf);
    expect(res.body.name).toBe(falseClient.name);
    expect(res.body.email).toBe(falseClient.email);
    expect(res.body.location).toBe(falseClient.location);
    expect(res.body.address).toBe(falseClient.address);
    expect(res.body.office).toBe(falseClient.office);
    expect(res.body.active).toBe(falseClient.active);
    notActiveID = res.body._id;
    done();
  });

  it('Post client error', async (done) => {
    const errorClient = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      secondaryPhone: '',
      office: '',
      location: '',
      address: '',
      userID: '6089c3538dfebe00555bc17e'
    };
    const res = await request(app).post('/clients/create/').set('x-access-token', token).send(errorClient);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(["invalid name", "invalid cpf", "invalid email","invalid phone", "invalid secondary phone"]);
    done();
  });

  it('Get clients', async (done) => {
    const res = await request(app).get('/clients/').set('x-access-token', token);
    const lastIdx = res.body.length - 1; // Get last client on list
    expect(res.statusCode).toBe(200);
    expect(res.body[lastIdx].name).toBe(client.name);
    expect(res.body[lastIdx].cpf).toBe(client.cpf);
    expect(res.body[lastIdx].email).toBe(client.email);
    expect(res.body[lastIdx].phone).toBe(client.phone);
    expect(res.body[lastIdx].secondaryPhone).toBe(client.secondaryPhone);
    expect(res.body[lastIdx].office).toBe(client.office);
    expect(res.body[lastIdx].location).toBe(client.location);
    expect(res.body[lastIdx].address).toBe(client.address);
    expect(res.body[lastIdx].active).toBe(true);
    done();
  });

  it('Get client by id', async (done) => {
    const res = await request(app).get(`/clients/${activeID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(client.name);
    expect(res.body.cpf).toBe(client.cpf);
    expect(res.body.email).toBe(client.email);
    expect(res.body.phone).toBe(client.phone);
    expect(res.body.secondaryPhone).toBe(client.secondaryPhone);
    expect(res.body.office).toBe(client.office);
    expect(res.body.location).toBe(client.location);
    expect(res.body.address).toBe(client.address);
    expect(res.body.active).toBe(true);
    done();
  });

  it('Get deactivated clients', async (done) => {
    const res = await request(app).get('/clients?active=false').set('x-access-token', token);
    const lastIdx = res.body.length - 1; // Get last client on list
    expect(res.statusCode).toBe(200);
    expect(res.body[lastIdx].address).toBe(falseClient.address);
    expect(res.body[lastIdx].location).toBe(falseClient.location);
    expect(res.body[lastIdx].email).toBe(falseClient.email);
    expect(res.body[lastIdx].office).toBe(falseClient.office);
    expect(res.body[lastIdx].cpf).toBe(falseClient.cpf);
    expect(res.body[lastIdx].name).toBe(falseClient.name);
    expect(res.body[lastIdx].phone).toBe(falseClient.phone);
    expect(res.body[lastIdx].secondaryPhone).toBe(falseClient.secondaryPhone);
    expect(res.body[lastIdx].active).toBe(false);
    done();
  });

  it('Get without token', async (done) => {
    const res = await request(app).get('/clients?active=false');
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'No token was provided.' });
    done();
  });

  it('Get with invalid token', async (done) => {
    const res = await request(app).get('/clients?active=false').set('x-access-token', 'abc123');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ auth: false, message: 'The token could not be authenticated.' });
    done();
  })

  it('Update client', async (done) => {
    const updatedClientData = {
      name: 'Davi Arthur',
      cpf: '69874536822',
      email: 'arthur@gmail.com',
      phone: '9966885522',
      secondaryPhone: '123688559',
      office: 'Policial',
      location: 'DPSS',
      address: 'Brasilia',
      userID: '6089c3538dfebe00555bc17e'
    }
    const res = await request(app).put(`/clients/update/${activeID}`).set('x-access-token', token).send(updatedClientData);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedClientData.name);
    expect(res.body.cpf).toBe(updatedClientData.cpf);
    expect(res.body.email).toBe(updatedClientData.email);
    expect(res.body.phone).toBe(updatedClientData.phone);
    expect(res.body.secondaryPhone).toBe(updatedClientData.secondaryPhone);
    expect(res.body.office).toBe(updatedClientData.office);
    expect(res.body.location).toBe(updatedClientData.location);
    expect(res.body.address).toBe(updatedClientData.address);
    done();
  });

  it('Update client error', async (done) => {
    const updatedClientData = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      secondaryPhone: '',
      office: '',
      location: '',
      address: '',
      userID: '6089c3538dfebe00555bc17e'
    }
    const res = await request(app).put(`/clients/update/${activeID}`).set('x-access-token', token).send(updatedClientData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(['invalid name', 'invalid cpf', 'invalid email', 'invalid phone', 'invalid secondary phone']);
    done();
  });

  it('Toggle active client', async (done) => {
    const res = await request(app).put(`/clients/toggleStatus/${activeID}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.active).toBe(false);
    done();
  });

  it('Get client history', async (done) => {
    const client = {
      name: 'Vitor Leal',
      cpf: '05903217141',
      email: 'vitinho2201@email.com',
      phone: '99887564',
      secondaryPhone: '996687342',
      office: 'Policial',
      location: '1a DP',
      address: 'Aguas Claras',
      userID: '6089c3538dfebe00555bc17e'
    };
    const createClient = await request(app).post('/clients/create/').set('x-access-token', token).send(client);

    const res = await request(app).get(`/clients/history/${createClient.body._id}`).set('x-access-token', token);
    expect(res.body[0].label).toBe('created');
    expect(res.body[0].user.name).toBe('Julia Batista');
    done();
  });

  it('Get client history error', async (done) => {
    const error = { message: 'Client not found' }
    const res = await request(app).get(`/clients/history/123`).set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ "message": "Client not found" });
    done();
  });
});

afterAll(async (done) => {
  done();
});
