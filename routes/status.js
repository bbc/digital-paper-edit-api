const messageBroker = require('../lib/messageBroker');

module.exports = {
  healthCheck: (req, res) => {
    res.sendStatus(200);
  },
  sendMessage: (req, res) => {
    messageBroker.publish('Hello from Digital Paper Edit API', (err, data) => {
      if (err) {
        console.log('Error from publish: ', err);
        res.status(500).json({ err });
      } else {
        console.log('Data from publish: ', data);
        res.status(200).json({ message: data });
      }
    });
  },
};
