const AWS = require('aws-sdk');

const getTopicArn = () => [
  'arn:aws:sns',
  process.env.AWS_REGION,
  process.env.AWS_ACCOUNT,
  process.env.SNS_TOPIC,
].join(':');

const publish = (msg) => {
  const sns = new AWS.SNS({
    apiVersion: '2010-03-31',
    region: process.env.AWS_REGION,
  });

  const params = {
    Message: msg,
    TopicArn: getTopicArn(),
  };

  const promisePublish = new Promise((resolve, reject) => {
    sns.publish(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  return promisePublish;
};

module.exports = { publish };
