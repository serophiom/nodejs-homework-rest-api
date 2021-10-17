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
const guard = require('../../../helpers/guard');
const role = require('../../../helpers/role');

router.get('/', guard, getContacts);

router.get('/:contactId', guard, idValidation, getContactById);

router.post('/', guard, contactValidation, addContact);

router.delete('/:contactId', guard, idValidation, deleteContact);

router.patch('/:contactId', guard, [idValidation, contactChangeValidation], changeContact);

router.patch('/:contactId/favorite', guard, [idValidation, validateStatusContact], updateStatusContact);

router.get('/test', guard, (req, res, next) => {

});

module.exports = router;