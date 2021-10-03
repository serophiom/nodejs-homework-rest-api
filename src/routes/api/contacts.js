const express = require('express')
const router = express.Router()

const {
  contactValidation,
  contactChangeValidation,
  idValidation,
} = require('../../middlewares/validationMiddleware')

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact
} = require('../../controllers/contactController')

router.get('/', getContacts)

router.get('/:contactId', idValidation, getContactById)

router.post('/', contactValidation, addContact)

router.delete('/:contactId', idValidation, deleteContact)

router.put('/:contactId', idValidation, contactChangeValidation, changeContact)

module.exports = router
