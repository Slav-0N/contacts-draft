const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const dataList = await fs.readFile(contactsPath);
    return JSON.parse(dataList.toString());;
}

const getById = async (id) => {
    const getContactList = await listContacts();
    const isIdPresent = getContactList.find(el=>el.id === id);
    return isIdPresent || null;   
    }

const addContact = async ({name, email, phone}) =>{
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    const contactList = await listContacts();
    const pushNewContact=[...contactList, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(pushNewContact, null, 2));  
    return newContact

}

const renewContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(el => el.id === id);

  if (index === -1) {
    return null; // Для обработки 404 в контроллере
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};


const deleteContact = async(id) =>{
    const contacts = await listContacts();
    const index = contacts.findIndex(el => el.id === id);
    if (index === -1) {
        return null; // Для обработки 404 в контроллере
    }
    const result = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;

}

module.exports = {
    listContacts,
    getById,
    addContact,
    renewContact,
    deleteContact
}