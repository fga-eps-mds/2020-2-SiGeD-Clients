const axios = require('axios');

const checkUserPermission = async (res, userID, token) => {
  const user = await getUser(res, userID, token)
  if(!user){
    return { error: 'User not found' };
  }
  return user
}

const getUser = async (res, userID, token) => {
  try {
    const user = await axios.get(`http://${process.env.USERS_URL}:3001/users/${userID}`, { headers: { 'x-access-token': token } })
      .then((response) => response.data)
    return user
  } catch {
    return { error: 'Could not connect to user api' };
  }
}

module.exports = { getUser, checkUserPermission};
