const validateName = (name) => {
  const regex = /^[a-zA-Z ]{2,30}$/;
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

const validateOffice = (office) => {
  const regex = /^[a-zA-Z ]{2,}$/;
  return regex.test(office);
};

const validatePoliceStation = (policeStation) => {
  const regex = /^[a-zA-Z ]{2,}$/;
  return regex.test(policeStation);
};

const validateCity = (city) => {
  const regex = /^[a-zA-Z ]{2,}$/;
  return regex.test(city);
};

const validate = (name, cpf, email, phone, office, policeStation, city) => {
  if
  (!validateName(name) || !validateCpf(cpf) || !validateEmail(email)
  || !validatePhone(phone) || !validateOffice(office) || !validatePoliceStation(policeStation)
  || !validateCity(city)) {
    return false;
  }
  return true;
};

const validateActive = (active) => {
  const regex = /^(true|false)$/;
  return regex.test(active);
};

module.exports = { validate, validateActive };
