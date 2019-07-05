const MessageBroker = require('../components/MessageBroker');

module.exports = {
  healthCheck: (req, res) => {
    res.sendStatus(200);
  },
  sendMessage: (req, res) => {
    MessageBroker.publish('Hello from Digital Paper Edit API')
      .then((data) => {
        res.status(200).json({ message: data });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
