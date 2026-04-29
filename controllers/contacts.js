const {listContacts, getById, addContact, renewContact, deleteContact} = require("../models");
const {HttpError, ctrlWrap} = require("../helpers");

const getAll =async(req, res, next)=>{
  const allContacts = await listContacts();
  res.json(allContacts);
}

// const getAll =async(req, res, next)=>{
//   try {
//     const allContacts = await listContacts();
//      res.json(allContacts);
//   } catch (error) {
//    next(error);
//   }
// }


const getContactById = async(req, res, next) => {
  const {id} = req.params;
  const findContact = await getById(id);
  if (!findContact){
    throw HttpError(404, "охуенная ошибочка 404")
  }
  res.json(findContact); 
  
}

// const getContactById = async(req, res, next) => {
//   try {
//     const {id} = req.params;
//     const findContact = await getById(id);
//     if (!findContact){
//       throw HttpError(404, "охуенная ошибочка 404")
//     }
//     res.json(findContact); 
//   } catch (error) {
//     next(error);
//   }
// }

const addNewContact = async(req, res, next)=>{
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
}

const updateById = async(req, res, next)=>{
  const {id} = req.params;
  const findContact = await getById(id);
  if (!findContact){
    throw HttpError(404, "пАмИлка нова")
  }
  const changedContact = await renewContact(id, req.body);
  res.json(changedContact); 
}




module.exports = {
    getAll: ctrlWrap(getAll),
    getContactById: ctrlWrap(getContactById),
    addNewContact: ctrlWrap(addNewContact),
    updateById:  ctrlWrap(updateById)
}