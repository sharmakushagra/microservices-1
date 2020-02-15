'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.createUser = function createUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if(response.payload && response.code)
        return utils.writeJson(res, response.payload, response.code);
      else
        return utils.writeJson(res, response, 500);
    });
};
