module.exports = app => {
  app.get("/queue", (req, res) => {
    console.log(`Data from queue.js: ${data}`);
    res.status(200).json({ message: data });
  });
};
