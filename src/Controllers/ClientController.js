const Client = require('../Models/ClientSchema');
const validation = require('../utils/validate');

const accessList = async (req, res) => {
  const clients = await Client.find();

  return res.json(clients);
};

const access = async (req, res) => {
  const { id } = req.params;

  const client = await Client.find({ _id: id });

  return res.json(client);
};

const create = async (req, res) => {
  const {
    name, cpf, email, phone, office, policeStation, city, active,
  } = req.body;
  if (!validation.validate(name, cpf, email, phone, office, policeStation, city)) {
    return res.json({ message: 'invalid' });
  }

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
};

const update = async (req, res) => {
  const { id } = req.params;
  let {
    name, cpf, email, phone, office, policeStation, city,
  } = req.body;

  if (!validation.validate(name, cpf, email, phone, office, policeStation, city)) {
    return res.json({ message: 'invalid' });
  }

  const clientFound = await Client.findOne({ _id: id });

  if (req.body.name === clientFound.name) {
    name = clientFound.name;
  } else {
    name = await name;
  }

  if (req.body.cpf === clientFound.cpf) {
    cpf = clientFound.cpf;
  } else {
    cpf = await cpf;
  }

  if (req.body.email === clientFound.email) {
    email = clientFound.email;
  } else {
    email = await email;
  }

  if (req.body.phone === clientFound.phone) {
    phone = clientFound.phone;
  } else {
    phone = await phone;
  }

  if (req.body.office === clientFound.office) {
    office = clientFound.office;
  } else {
    office = await office;
  }

  if (req.body.policeStation === clientFound.policeStation) {
    policeStation = clientFound.policeStation;
  } else {
    policeStation = await policeStation;
  }

  if (req.body.city === clientFound.city) {
    city = clientFound.city;
  } else {
    city = await city;
  }

  const updateReturn = await Client.findOneAndUpdate({ _id: id }, {
    name, cpf, email, phone, office, policeStation, city,
  },
  { new: true }, (err, client) => {
    if (err) {
      return res.json(err);
    }
    return res.json(client);
  });
  return updateReturn;
};

const desactivate = async (req, res) => {
  const { id } = req.params;

  const clientFound = await Client.findOne({ _id: id });

  let { active } = clientFound;

  if (!validation.validateActive(active)) {
    return res.json({ message: 'invalid' });
  }

  if (active === true) {
    active = !active;
  }

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
  accessList, access, create, update, desactivate,
};
