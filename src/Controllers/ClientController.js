const Client = require('../Models/ClientSchema');
require('dotenv-safe').config();

const access = async (req, res) => {
    const id = req.params.id;
    let {name, cpf, email, phone, office, policeStation, city} = req.body;
    const client = await Client.findOne({_id:id});;

    return res.json(client);
  };


const create = async (req, res) => {
    let {name, cpf, email, phone, office, policeStation, city, active} = req.body;
    console.log(name, cpf, email)
    if (!validate(name, cpf, email, phone, office, policeStation, city)) {
        return res.json({"message":"invalid"});
    }

    const client = ({
        name: name, 
		cpf : cpf,
        email: email,
		phone : phone,
		office : office,
		policeStation : policeStation,
        city : city,
        active: active,
    });
    return res.json(client);
}

const update = async (req, res) => {
    const id = req.params.id;
    let {name, cpf, email, phone, office, policeStation, city} = req.body;

    if (!validate(name, cpf, email, phone, office, policeStation, city)) {
        return res.json({"message":"invalid"});
    }

    const clientFound = await Client.findOne({_id:id});

    if (req.body.name === clientFound.name) {
        name = clientFound.name;
    } 
    else { 
        name = await name;
    }

    if (req.body.cpf === clientFound.cpf) {
        cpf = clientFound.cpf;
    } 
    else { 
        cpf = await cpf;
    }

    if (req.body.email === clientFound.email) {
        email = clientFound.email;
    } 
    else { 
        email = await email;
    }

    if (req.body.phone === clientFound.phone) {
        phone = clientFound.phone;
    } 
    else { 
        phone = await phone;
    }

    if (req.body.office === clientFound.office) {
        office = clientFound.office;
    } 
    else { 
        office = await office;
    }

    if (req.body.policeStation === clientFound.policeStation) {
        policeStation = clientFound.policeStation;
    } 
    else { 
        policeStation = await policeStation;
    }

	if (req.body.city === clientFound.city) {
        city = clientFound.city;
    } 
    else { 
        city = await city;
    }

    const updateReturn = await Client.findOneAndUpdate({_id:id}, {name, cpf, email, phone, office, policeStation, city}, 
        { new:  true }, (err, client)=>{
            if (err) {
                return res.json(err);
            } else {
                return res.json(client);
            }
    })
    return updateReturn;
}

// Precisa ser repensado, provavelmente está errada a implementação
const desactivate = async (req, res) => {
    const id = req.params.id
    let {name, cpf, email, phone, office, policeStation, city, active} = req.body;

	if (!validate(name, cpf, email, phone, office, policeStation, city)) {
        return res.json({"message":"invalid"});
    }

    const clientFound = await Client.findOne({_id:id});

    if(req.body.active === false){
        active = !clientFound.active;
    }
    else{
        active = active
    }

	const updateReturn = await Client.findOneAndUpdate({_id:id}, {name, cpf, email, phone, office, policeStation, city, active}, 
        { new:  true }, (err, client)=>{
            if (err) {
                return res.json(err);
            } else {
                return res.json(client);
            }
    })
    return updateReturn;
}

const validate = (name, cpf, email, phone, office, policeStation, city) => {
    if ( !validateName(name) || !validateCpf(cpf) || !validateEmail(email) || !validatePhone(phone) || !validateOffice(office) || !validatePoliceStation(policeStation) || !validateCity(city)) {
        return false;
    }
    return true;
}

const validateName = (name) => {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(name);
} 

const validateCpf = (cpf) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
} 

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);   
}

const validatePhone = (phone) => {
    const regex = /^[0-9]{8,}$/;
    return regex.test(phone);
} 

const validateOffice = (office) => {
    const regex = /^[a-zA-Z ]{2,}$/;
    return regex.test(office);
}

const validatePoliceStation = (policeStation) => {
    const regex = /^[a-zA-Z ]{2,}$/;
    return regex.test(policeStation);
}

const validateCity = (city) => {
    const regex = /^[a-zA-Z ]{2,}$/;
    return regex.test(city);
}

module.exports = {access, create, update, desactivate}

