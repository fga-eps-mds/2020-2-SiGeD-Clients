const Client = require('../Models/ClientSchema');
const moment = require('moment-timezone');

const buildHistory = (body, client, label) => {
  const date = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate();
  return {
    label,
    before: client[label],
    after: body[label],
    userID: body.userID,
    date
  }
}

const verifyChanges = async (body, id) => {
  const client = await Client.findOne({ _id: id });

  let newHistory = [];

  if (body.name !== client.name){
    newHistory.push(buildHistory(body, client, 'name'))
  }
  if (body.cpf !== client.cpf){
    newHistory.push(buildHistory(body, client, 'cpf'))
  }
  if (body.email !== client.email){
    newHistory.push(buildHistory(body, client, 'email'))
  }
  if (body.phone !== client.phone){
    newHistory.push(buildHistory(body, client, 'phone'))
  }
  if (body.secondaryPhone !== client.secondaryPhone){
    newHistory.push(buildHistory(body, client, 'secondaryPhone'))
  }
  if (body.office !== client.office){
    newHistory.push(buildHistory(body, client, 'office'))
  }
  if (body.address !== client.address){
    newHistory.push(buildHistory(body, client, 'address'))
  }
  if (body.location !== client.location){
    newHistory.push(buildHistory(body, client, 'location'))
  }

  return [...client.history, ...newHistory];
}

module.exports = verifyChanges;
