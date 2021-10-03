const express = require('express');
const router = express.Router();

const {
  addContactsValidation,
  putContactsValidation
} = require('../../middlewares/validationMiddleware');

const {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  changeContact
} = require('../../controllers/contactController');

router.get('/', getContacts);

router.get('/:contactId', getContactsById);

router.post('/', addContactsValidation, addContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', putContactsValidation, changeContact);

module.exports = router;