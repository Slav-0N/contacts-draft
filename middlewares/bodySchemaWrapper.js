const HttpError = require("../helpers/HttpError");
const {bodySchema} = require("../schemas");




const bodySchemaWrapper = (req, res, next) => {
    const {error} = bodySchema.validate(req.body);
    if(error){
      throw HttpError(400, error.message);
    }
    next();
} 

module.exports = bodySchemaWrapper;