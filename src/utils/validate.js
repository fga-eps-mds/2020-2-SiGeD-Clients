const validateName = (name) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  if (!regex.test(name)) {
    return 'invalid name';
  } return true;
};

const validateCpf = (cpf) => {
  const regex = /^[0-9]{11}$/;
  if (!regex.test(cpf)) {
    return 'invalid cpf';
  } return true;
};

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email)) {
    return 'invalid email';
  } return true;
};

const validatePhone = (phone) => {
  const regex = /^[0-9]{8,}$/;
  if (!regex.test(phone)) {
    return 'invalid phone';
  } return true;
};

const validateOffice = (office) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  if (!regex.test(office)) {
    return 'invalid office';
  } return true;
};

const validatePoliceStation = (policeStation) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  if (!regex.test(policeStation)) {
    return 'invalid policeStation';
  } return true;
};

const validateCity = (city) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  if (!regex.test(city)) {
    return 'invalid city';
  } return true;
};

const validate = (name, cpf, email, phone, office, policeStation, city) => {
  if (validateName(name) !== true) {
    return validateName(name);
  } if (validateCpf(cpf) !== true) {
    return validateCpf(cpf);
  } if (validateEmail(email) !== true) {
    return validateEmail(email);
  } if (validatePhone(phone) !== true) {
    return validatePhone(phone);
  } if (validateOffice(office) !== true) {
    return validateOffice(office);
  } if (validatePoliceStation(policeStation) !== true) {
    return validatePoliceStation(policeStation);
  } if (validateCity(city) !== true) {
    return validateCity(city);
  }
  return true;
};

const validateActive = (active) => {
  const regex = /^(true|false)$/;
  return regex.test(active);
};

module.exports = { validate, validateActive };
