const axios = require('axios');

const checkUserPermission = async (res, userID, token) => {
  const user = await getUser(res, userID, token)
  if(user === null){
    return res.status(400).json({ message: "User not found" });
  }
}

const getUser = async (res, userID, token) => {
  try {
    const user = await axios.get(`http://${process.env.USERS_URL}:3001/users/${userID}`, { headers: { 'x-access-token': token } })
      .then((response) => response.data)
    return user
  } catch {
    return res.status(400).json({err: 'Could not connect to api_users'});
  }
}

module.exports = { getUser, checkUserPermission};
