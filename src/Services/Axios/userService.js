const { APIUsers } = require('./baseService');

const getUser = async (userID, token) => {
  try {
    const user = await APIUsers.get(`http://${process.env.USERS_URL}:3001/users/${userID}`, { headers: { 'x-access-token': token } })
      .then((response) => response.data);
    if(!user) {
      return { error: 'User not found' }
    }
    return user;
  } catch {
    return { error: 'Could not connect to user api' };
  }
};

module.exports = { getUser };