let contacts = [
    {
      "id": "1",
      "name": "Allen Raymond",
      "email": "nulla.ante@vestibul.co.uk",
      "phone": "(992) 914-3792"
    },
    {
      "id": "2",
      "name": "Chaim Lewis",
      "email": "dui.in@egetlacus.ca",
      "phone": "(294) 840-6685"
    },
    {
      "id": "3",
      "name": "Kennedy Lane",
      "email": "mattis.Cras@nonenimMauris.net",
      "phone": "(542) 451-7038"
    },
    {
      "id": "4",
      "name": "Wylie Pope",
      "email": "est@utquamvel.net",
      "phone": "(692) 802-2949"
    },
    {
      "id": "5",
      "name": "Cyrus Jackson",
      "email": "nibh@semsempererat.com",
      "phone": "(501) 472-5218"
    },
    {
      "id": "6",
      "name": "Abbot Franks",
      "email": "scelerisque@magnis.org",
      "phone": "(186) 568-3720"
    },
    {
      "id": "7",
      "name": "Reuben Henry",
      "email": "pharetra.ut@dictum.co.uk",
      "phone": "(715) 598-5792"
    },
    {
      "id": "8",
      "name": "Simon Morton",
      "email": "dui.Fusce.diam@Donec.com",
      "phone": "(233) 738-2360"
    },
    {
      "id": "9",
      "name": "Thomas Lucas",
      "email": "nec@Nulla.com",
      "phone": "(704) 398-7993"
    },
    {
      "id": "10",
      "name": "Alec Howard",
      "email": "Donec.elementum@scelerisquescelerisquedui.net",
      "phone": "(748) 206-2688"
    }
  ];

const getContacts =  async (req, res, next) => {
    res.json({ contacts, message: 'All contacts show' })
};

const getContactsById =  async (req, res, next) => {
    const [contact] = contacts.filter(contact => contact.id === req.params.id)
  
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
  
    return res.status(200).json({ contact, message: 'Contact found' })
};

const addContact = async (req, res, next) => {
    const {
      name,
      email,
      phone
    } = req.body;
  
    contacts.push({
      id: new Date.getTime().toString(),
      name,
      email,
      phone
    })
    return res.status(201).json({ message: 'Contact added' })
};

const deleteContact = async (req, res, next) => {
    contacts = contacts.filter(contact => contact.id !== req.params.id);
    return res.status(200).json({ message: 'Contact deleted' });
};

const changeContact = async (req, res, next) => {
    const {
      name,
      email,
      phone
    } = req.body;
  
    contacts.forEach(contact => {
      if (contact.id === req.params.id) {
        contact.name = name;
        contact.email = email;
  
        contact.phone = phone;
        return res.status(200).json({ message: 'Contact changed' })
      }
    });
};

module.exports = {
    getContacts,
    getContactsById,
    addContact,
    deleteContact,
    changeContact
};

