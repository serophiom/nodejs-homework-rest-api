const { changeContact } = require('../src/controllers/contactsController');
const Contacts = require('../repository/contactsRepository');
const jestConfig = require('../jest.config');
const { expectCt } = require('helmet');

jest.mock('../repository/contactsRepository');

describe('Unit test controller changeContact', () => {
    let req, res, next;
    
beforeEach(() => {
    Contacts.updateContact = jest.fn();
    req = { params: { id: 3}, body: {}, user: { _id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn(data => data) };
    next = jest.fn();
});

    it('Contact exist', async () => {
        const contact = { id: 3, name: 'Simon', email: 'simon@gmail.com', phone: '65478545' }
        Contacts.updateContact = jest.fn(() => {
            return contact;
        });
        const result = await changeContact(req, res, next);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('status');
        expect(result).toHaveProperty('code');
        expect(result).toHaveProperty('data');
        expect(result.data.contact).toEqual(contact);
    });

    it('Contact not exist', async () => {
        return changeContact(req, res, next).catch((error) => {
            expect(error.status).toEqual(404);
            expect(error.message).toEqual(`Contact with id ${req.params.contactId} not found`);
        })
      
    });
});