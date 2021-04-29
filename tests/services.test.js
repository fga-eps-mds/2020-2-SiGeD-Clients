const {getUser} = require('../src/Services/Axios/userService');
const jwt = require('jsonwebtoken');

const user = require('./__mocks__/apiResponses/user.json')

const { USERS_URL } = process.env;

it('Should get clients', async () => {
  const token = '';
  const id = 'ID'
  const res =  await getUser(id, token);
  expect(res).toEqual(user);
});
