const codeService = require('../services/codeServices');

const getCode = async(req,res) => {

  try {
    const language = req.params.language;
    const codeBody = req.body;

    if(!codeBody || !language){
      res.status(404).json({message: "Language or Code Body is missing"});
    }

    const user = await codeService.runCodeBody(codeBody,language);

    

  } catch (error) {
    
  }
};

module.exports = {getCode}