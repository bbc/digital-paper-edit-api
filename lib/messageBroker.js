const AWS = require('aws-sdk');

const getTopicArn = () => {
  const topicArn = [
    'arn:aws:sns',
    process.env.AWS_REGION,
    process.env.AWS_ACCOUNT,
    process.env.SNS_TOPIC,
  ].join(':');

  return topicArn;
};

const publish = (msg, cb) => {
  const sns = new AWS.SNS({
    apiVersion: '2010-03-31',
    region: process.env.AWS_REGION,
  });

  const params = {
    Message: msg,
    TopicArn: getTopicArn(),
  };

  return sns.publish(params, (err, data) => {
    cb(err, data);
  });
};

module.exports = { publish };
