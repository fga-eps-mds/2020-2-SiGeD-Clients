const {getUser} = require('../src/Services/Axios/userService');
const jwt = require('jsonwebtoken');

const user = require('./__mocks__/apiResponses/user.json')

const { USERS_URL } = process.env;

it('Should get clients', async () => {
  const token = '';
  const id = '6089c3538dfebe00555bc17e'
  const res =  await getUser(id, token);
  expect(res).toEqual(user);
});
