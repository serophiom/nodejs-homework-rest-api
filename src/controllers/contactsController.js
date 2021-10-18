const Contacts = require('../../repository/contactsRepository');

const getContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await Contacts.listContacts(userId, req.query);
    res.json({ status: 'success', code: 200, data: { ...data } })
  } catch (error) {
    next(error)
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.getContactById(req.params.contactId, userId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
        message: `Contact with id ${req.params.contactId} found`
      })
    }
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${req.params.contactId} not found`
    })
  } catch (error) {
    next(error)
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.addContact({...req.body, owner: userId});
    res.status(201).json({
      status: 'success',
      cod: 201,
      data: { contact },
      massege: `Contact with name ${req.body.name} added`
    })
  } catch (error) {
    next(error)
  }
};

const changeContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    )
    if (contact) {
      return res.status(200)
        .json({
          status: 'success',
          code: 200,
          data: { contact }
        })
    }
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${req.params.contactId} not found`,
    })
  } catch (error) {
    next(error)
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    );
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
        message: `Status contact with name ${contact.name} updated!`,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id ${req.params.contactId} not found!`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.removeContact(req.params.contactId, userId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        cod: 200,
        data: { contact },
        message: `Contact with id ${req.params.contactId} deleted`,
      })
    } else {
      return res.status(404).json({
        status: 'error',
        cod: 404,
        message: `Contact with id ${req.params.contactId} not found`,
      })
    }
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  updateStatusContact,
}
