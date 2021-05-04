const validateName = (name) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  return regex.test(name);
};

const validateCpf = (cpf) => {
  const regex = /^[0-9]{11}$/;
  return regex.test(cpf);
};

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^[0-9]{8,}$/;
  return regex.test(phone);
};

const validateFeatures = (name, description, color) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  } if (!description) {
    errors.push('invalid description');
  } if (!color) {
    errors.push('invalid color');
  }

  return errors;
};

const validate = (name, cpf, email, phone, secondaryPhone) => {
  const err = [];

  if (!validateName(name)) {
    err.push('invalid name');
  } if (!validateCpf(cpf)) {
    err.push('invalid cpf');
  } if (!validateEmail(email)) {
    err.push('invalid email');
  } if (!validatePhone(phone)) {
    err.push('invalid phone');
  } if (!validatePhone(secondaryPhone)) {
    err.push('invalid secondary phone');
  }

  return err;
};

const validateActive = (active) => {
  const regex = /^(true|false)$/;
  return regex.test(active);
};

module.exports = { validate, validateActive, validateFeatures };
