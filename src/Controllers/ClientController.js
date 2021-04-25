const moment = require('moment-timezone');
const Client = require('../Models/ClientSchema');
const validation = require('../utils/validate');

const accessList = async (req, res) => {
  const { active } = req.query;
  if (active === 'false') {
    const clients = await Client.find({ active });
    return res.json(clients);
  }

  const clients = await Client.find({ active: true });

  return res.json(clients);
};

const access = async (req, res) => {
  const { id } = req.params;

  const client = await Client.findOne({ _id: id });

  return res.json(client);
};

const create = async (req, res) => {
  const {
    name, cpf, email, phone, secondaryPhone, address, office, active, location,
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, secondaryPhone, office);

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const client = await Client.create({
      name,
      cpf,
      email,
      phone,
      secondaryPhone,
      office,
      location,
      address,
      active,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ duplicated: error.keyValue });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, email, phone, secondaryPhone, office, address, location,
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, secondaryPhone, office);

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const client = await Client.findOneAndUpdate({ _id: id }, {
      name,
      cpf,
      email,
      phone,
      secondaryPhone,
      office,
      location,
      address,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    },
    { new: true });
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ duplicated: error.keyValue });
  }
};

const toggleStatus = async (req, res) => {
  const { id } = req.params;

  const clientFound = await Client.findOne({ _id: id });

  let { active } = clientFound;

  if (!validation.validateActive(active)) {
    return res.status(400).json({ message: 'invalid active value' });
  }

  active = !clientFound.active;

  const updateReturn = await Client.findOneAndUpdate({ _id: id }, { active },
    { new: true }, (err, client) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.json(client);
    });
  return updateReturn;
};

module.exports = {
  accessList, access, create, update, toggleStatus,
};
