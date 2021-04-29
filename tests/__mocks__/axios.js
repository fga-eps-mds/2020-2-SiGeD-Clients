const user = require('./apiResponses/user.json')
const GET_USER_BY_ID = '/users/ID'

const axios = {
  get: jest.fn((url) => {
    switch (url) {
      case GET_USER_BY_ID:
        return Promise.resolve({ data: user }); 
      default:
        return Promise.resolve({ data: { error: `Mock URL ${url} not found` }});
    }
  }),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

module.exports = axios;