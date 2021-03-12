const Client = require('../Models/ClientSchema');
const validation = require('../utils/validate');

const accessList = async (req, res) => {
  const clients = await Client.find({active: true});

  return res.json(clients);
};

const access = async (req, res) => {
  const { id } = req.params;

  const client = await Client.findOne({ _id: id });

  return res.json(client);
};

const create = async (req, res) => {
  const {
    name, cpf, email, phone, office, policeStation, city, active,
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, office, policeStation, city);

  if (errorMessage.length) {
    return res.json({ message: errorMessage });
  }

  try {
    const client = await Client.create({
      name,
      cpf,
      email,
      phone,
      office,
      policeStation,
      city,
      active,
    });
    return res.json(client);
  } catch (error) {
    return res.json({ duplicated: error.keyValue });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, email, phone, office, policeStation, city,
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, office, policeStation, city);

  if (errorMessage.length) {
    return res.json({ message: errorMessage });
  }

  try {
    const client = await Client.findOneAndUpdate({ _id: id }, {
      name, cpf, email, phone, office, policeStation, city,
    },
    { new: true });
    return res.json(client);
  } catch (error) {
    return res.json({ duplicated: error.keyValue });
  }
};

const deactivate = async (req, res) => {
  const { id } = req.params;

  const clientFound = await Client.findOne({ _id: id });

  let { active } = clientFound;

  if (!validation.validateActive(active)) {
    return res.json({ message: 'invalid active value' });
  }

  active = false;

  const updateReturn = await Client.findOneAndUpdate({ _id: id }, { active },
    { new: true }, (err, client) => {
      if (err) {
        return res.json(err);
      }
      return res.json(client);
    });
  return updateReturn;
};

module.exports = {
  accessList, access, create, update, deactivate,
};
