const moment = require('moment-timezone');
const Client = require('../Models/ClientSchema');
const validation = require('../utils/validate');
const verifyChanges = require('../utils/verifyChanges');
const userConnection = require('../utils/userConnection');


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
    name, cpf, email, phone, secondaryPhone, address, office, active, location, userID
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, secondaryPhone, office);

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const token = req.headers['x-access-token'];
    await userConnection.checkUserPermission(res, userID, token);

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
        label: 'created'
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
    name, cpf, email, phone, secondaryPhone, office, address, location, userID
  } = req.body;

  const errorMessage = validation.validate(name, cpf, email, phone, secondaryPhone, office);

  if (errorMessage.length) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const token = req.headers['x-access-token'];
    await userConnection.checkUserPermission(res, userID, token);

    const history = await verifyChanges(req.body, id); 
    const client = await Client.findOneAndUpdate({ _id: id }, {
      name,
      cpf,
      email,
      phone,
      secondaryPhone,
      office,
      location,
      address,
      history,
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

const history = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.headers['x-access-token'];
    const clientFound = await Client.findOne({ _id: id });
    const history = await Promise.all(clientFound.history.map(async (elem) => {
      const user = await userConnection.getUser(req, elem.userID, token);
      return {
        label: elem.label,
        before: elem.before,
        after: elem.after,
        date: elem.date,
        user: {
          _id: user._id,
          name: user.name,
          sector: user.sector,
          role: user.role
        }
      }
    }))
    return res.json(history)

  } catch (error) {
    return res.status(400).json({ message: error.keyValue });
  }
}

module.exports = {
  accessList, access, create, update, toggleStatus, history,
};
