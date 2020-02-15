
const AWS = require('aws-sdk');
require('dotenv').config();

// Set the region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});


const createUser = (params) => {
    return new Promise((resolve, reject) => {
        const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
        const reqParams = {
            DelaySeconds: 10,
            MessageAttributes: params,
            MessageBody: "New user",
            QueueUrl: process.env.AWS_SQS_URL
        };

        return sqs.sendMessage(reqParams, function (err, data) {
            console.log("err: ", err);
            console.log("data: ", data);
            if (err) {
                console.log("Error", err);
                return reject(err);
            } else {
                console.log("Success", data.MessageId);
                return resolve(true);
            }
        });
    })

};

module.exports = {
    createUser
};
