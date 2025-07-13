// keep_alive.js
const express = require("express");
const app = express();

function keepAlive() {
  app.get("/", (req, res) => {
    res.send("✅ Bot is alive!");
  });

  app.listen(3000, () => {
    console.log("🌐 Keep-alive server started on port 3000");
  });
}

module.exports = keepAlive;
