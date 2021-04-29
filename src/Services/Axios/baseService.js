const axios = require('axios');

const { USERS_URL } = process.env;

const APIUsers = axios.create({
  baseURL: `http://${USERS_URL}:3002/`,
});

module.exports = {
  APIUsers,
};