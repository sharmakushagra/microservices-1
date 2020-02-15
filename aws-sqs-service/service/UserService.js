'use strict';
const awsClient = require('../helpers/awsClient')
const uuidv1 = require('uuid/v1');

/**
 * Creates user
 * Creates user
 *
 * body User request object
 * returns UserResponse
 **/
exports.createUser = async (body) => {
  const {username, email, password} = body;
  const uuid = uuidv1();
  const reqObj = {
      username: {
          DataType: "String",
          StringValue: username
      },
      email: {
          DataType: "String",
          StringValue: email
      },
      password: {
          DataType: "String",
          StringValue: password
      },
      uuid: {
          DataType: "String",
          StringValue: uuid
      }
  };
  return awsClient.createUser(reqObj)
      .then(() => {
          return {message: 'User created', userId: uuid};
      })
      .catch(err => {
          return Promise.reject(err);
      });
}

