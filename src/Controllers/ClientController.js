const moment = require('moment-timezone');
const Client = require('../Models/ClientSchema');
const validation = require('../Utils/validate');
const verifyChanges = require('../Utils/verifyChanges');
const { getUser } = require('../Services/Axios/userService');

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

  try {
    const client = await Client.findOne({ _id: id });
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ message: 'Client not found' });
  }
};

const create = async (req, res) => {
  const {
    name, cpf, email, phone, secondaryPhone, address, office, active, location, userID,
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, secondaryPhone, office);

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const token = req.headers['x-access-token'];
    const user = await getUser(userID, token);

    if (user.error) {
      return res.status(400).json({ message: user.error });
    }
    const date = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate();
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
      history: {
        userID,
        date,
        label: 'created',
      },
      createdAt: date,
      updatedAt: date,
    });
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ message: error.keyValue });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, cpf, email, phone, secondaryPhone, office, address, location, userID,
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, secondaryPhone, office);

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const token = req.headers['x-access-token'];

    const user = await getUser(userID, token);

    if (user.error) {
      return res.status(400).json({ message: user.error });
    }

    const clientHistory = await verifyChanges(req.body, id);
    const client = await Client.findOneAndUpdate({ _id: id }, {
      name,
      cpf,
      email,
      phone,
      secondaryPhone,
      office,
      location,
      address,
      history: clientHistory,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    },
    { new: true });
    return res.json(client);
  } catch (error) {
    return res.status(400).json({ duplicated: error.keyValue });
  }
};

const toggleStatus = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).json({ message: 'Client not found' });
  }
};

const history = async (req, res) => {
  const { id } = req.params;

  try {
    let error = '';
    const token = req.headers['x-access-token'];
    const clientFound = await Client.findOne({ _id: id });
    const clientHistory = await Promise.all(clientFound.history.map(async (elem) => {
      const user = await getUser(elem.userID, token);
      if (user.error) {
        error = user.error;
        return;
      }
      return {
        label: elem.label,
        before: elem.before,
        after: elem.after,
        date: elem.date,
        user: {
          _id: user._id,
          name: user.name,
          sector: user.sector,
          role: user.role,
        },
      };
    }));
    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.json(clientHistory);
  } catch {
    return res.status(400).json({ message: 'Client not found' });
  }
};

const newestFourClientsGet = async (req, res) => {
  const clients = await Client.find().limit(4).sort({ createdAt: -1 });

  return res.status(200).json(clients);
};

module.exports = {
  accessList, access, create, update, toggleStatus, history, newestFourClientsGet,
};
