const express = require('express');
const router = express.Router();

const {
  contactValidation,
  contactChangeValidation,
  idValidation,
  validateStatusContact,
} = require('../../middlewares/validationMiddleware');

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require('../../controllers/contactsController');

router.get('/', getContacts);

router.get('/:contactId', idValidation, getContactById);

router.post('/', contactValidation, addContact);

router.delete('/:contactId', idValidation, deleteContact);

router.patch('/:contactId', [idValidation, contactChangeValidation], changeContact);

router.patch('/:contactId/favorite', [idValidation, validateStatusContact], updateStatusContact);

module.exports = router;