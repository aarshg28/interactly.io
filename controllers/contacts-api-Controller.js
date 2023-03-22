const Contact = require('../schema/contact');
const axios = require('axios')
const config = require('../config/config')();
const BASE_URL = config.apiUrl;
const apiConfig = {
  headers: {
    Authorization: `Token token=${config.apiKey}`,
    'Content-Type': 'application/json'
  }
};
/**
 * This Method used to createContact
 * @param {*} req 
 * @param {*} res 
 */
exports.createContact = async (req, res) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body
  console.log(req.body)
  if (data_store !== config.CRM && data_store !== config.DATABASE) {
    return res.status(400).json({ error: 'Invalid data store parameter' });
  }
  try {
    let contact
    if (data_store === config.CRM) {
      const payload = {
        contact: {
          first_name,
          last_name,
          mobile_number,
          email,
        },
      }
      const response = await axios.post(BASE_URL, payload, apiConfig)
      contact = response.data.contact
    } else {
      contact = await Contact.create({ first_name, last_name, email, mobile_number })
    }
    res.send(contact)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
}



/**
 * Get the contact Details using ID
 * @param {*} req 
 * @param {*} res 
 */
exports.getContact = async (req, res) => {
  const { contact_id, data_store } = req.body
  console.log(req.body)
  if (data_store !== config.CRM && data_store !== config.DATABASE) {
    return res.status(400).json({ error: 'Invalid data store parameter' });
  }
  try {
    let contact
    if (data_store === config.CRM) {
      const response = await axios.get(`${BASE_URL}/${contact_id}`, apiConfig)
      contact = response.data.contact
    } else {
      contact = await Contact.findByPk(contact_id)
    }
    res.send(contact)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
}


/**
 * update  updateContact
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateContact = async (req, res, next) => {
  const { contact_id, new_email, new_mobile_number, data_store } = req.body;
  if (data_store !== config.CRM && data_store !== config.DATABASE) {
    return res.status(400).json({ error: 'Invalid data store parameter' });
  }
  try {
    let response;
    if (data_store === config.CRM) {
      const payload = {
        contact: {
          email: new_email,
          mobile_number: new_mobile_number
        }
      };

      response = await axios.put(`${BASE_URL}/${contact_id}`, payload, apiConfig);
    } else {
      // Update contact in database
      const contact = await Contact.findByPk(contact_id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      contact.email = new_email;
      contact.mobile_number = new_mobile_number;
      await contact.save();
      response = contact.toJSON();
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}


/**
 * This method is used to deleteContact
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteContact = async (req, res) => {
  try {
    const { contact_id, data_store } = req.body;

    if (data_store !== config.CRM && data_store !== config.DATABASE) {
      return res.status(400).json({ error: 'Invalid data store parameter' });
    }
    let result;
    if (data_store === config.CRM) {
      const response = await axios.delete(`${BASE_URL}/${contact_id}`, apiConfig);
      result = response.data;
    } else {
      const deletedRows = await Contact.destroy({ where: { ID:contact_id } });
      result = { message: `Deleted ${deletedRows} contact(s) from DATABASE` };
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
