const jwt = require('jsonwebtoken');




const authenticate = function (req, res, next) {
    try {
      let token = req.headers['x-api-key'];
      if (!token)return res
          .status(400)
          .send({ status: false, msg: 'token must be present' });
  
      let decodedToken = jwt.verify(token, 'group-21');
      
      if (!decodedToken)
        return res.status(401).send({ status: false, msg: 'token is not valid' });
  
      next();
    } catch (err) {
      res.status(500).send({ Status: false, msg: err.message });
    }
  };

  module.exports.authenticate=authenticate