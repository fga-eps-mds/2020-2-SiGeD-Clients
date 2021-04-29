const axios = require('axios');

const { USERS_URL } = process.env;

const APIUsers = axios.create({
  baseURL: `http://${USERS_URL}:3001/`,
});

module.exports = {
  APIUsers,
};