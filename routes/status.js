const messageBroker = require('../lib/messageBroker');

module.exports = {
  healthCheck: (req, res) => {
    res.sendStatus(200);
  },
  sendMessage: (req, res) => {
    messageBroker.publish('Hello from Digital Paper Edit API', (err, data) => {
      if (err) {
        res.sendStatus(500).json({ status: 'not ok', message: err });
      } else {
        res.sendStatus(200).json({ status: 'ok', message: data });
      }
    });
  },
};
