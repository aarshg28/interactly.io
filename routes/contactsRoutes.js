const express = require('express');
const controller = require('../controllers/contacts-api-Controller');

const router = express.Router();

router.post('/createContact', controller.createContact);
router.post('/getContact', controller.getContact);
router.post('/updateContact/:id', controller.updateContact);
router.post('/deleteContact/:id', controller.deleteContact);

module.exports = router;