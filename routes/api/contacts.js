const express = require("express");
const {listContacts, getById, addContact, renewContact, deleteContact} = require("../../models");
const contactsRouter = express.Router();
const {HttpError} = require("../../helpers");
const {getAll, getContactById, addNewContact, updateById} = require("../../controllers");
const {bodySchemaWrapper} = require("../../middlewares");

contactsRouter.get("/", getAll);

contactsRouter.get("/:id",  getContactById);

contactsRouter.post("/", bodySchemaWrapper, addNewContact);

contactsRouter.put("/:id",  bodySchemaWrapper, updateById);


contactsRouter.delete("/:id", async(req, res, next)=>{

  try {
    const {id} = req.params;
    console.log(id);
    const findContact = await getById(id);
      console.log("findContact --->", findContact);
    if (!findContact){
      throw HttpError(404, "нЭт такого id!")
    }
    const deletId = await deleteContact(id);
    res.status(204).json(deletId);
  } catch (error) {
    next(error);
  }
})

module.exports = contactsRouter;