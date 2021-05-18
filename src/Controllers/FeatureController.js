const moment = require('moment-timezone');
const Feature = require('../Models/FeatureSchema');
const { validateFeatures } = require('../Utils/validate');

const getFeaturesList = async (req, res) => {
  const features = await Feature.find();

  return res.json(features);
};

const getFeaturesByID = async (req, res) => {
  const { featuresList } = req.body;
  try {
    const features = await Feature.find({ _id: { $in: featuresList } });
    return res.status(200).json(features);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};

const createFeature = async (req, res) => {
  const {
    name, description, color,
  } = req.body;

  const errorList = validateFeatures(name, description, color);

  if (errorList.length) {
    return res.status(400).json({ message: errorList });
  }

  const newFeature = await Feature.create({
    name,
    description,
    color,
    createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  });

  return res.status(200).json(newFeature);
};

const updateFeature = async (req, res) => {
  const { id } = req.params;
  const {
    name, description, color,
  } = req.body;

  const errorList = validateFeatures(name, description, color);

  if (errorList.length) {
    return res.status(400).json({ message: errorList });
  }

  try {
    const updateResponse = await Feature.findOneAndUpdate({ _id: id }, {
      name,
      description,
      color,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (feature) => feature);
    return res.status(200).json(updateResponse);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};

const deleteFeature = async (req, res) => {
  const { id } = req.params;

  try {
    await Feature.deleteOne({ _id: id });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};

module.exports = {
  getFeaturesList, getFeaturesByID, createFeature, updateFeature, deleteFeature,
};
