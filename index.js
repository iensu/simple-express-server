require("dotenv").config({ path: ".env" });

const express = require("express");
const config = require("./src/config");

const app = express();

app.get("/hej", (_req, res) => {
  console.log("Got a request! :D");
  res.status(200).send("hopp");
});

// Exit cleanly when interrupted
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

app.listen(config.PORT, () => {
  console.log(`Server is running at: http://localhost:${config.PORT}`);
});
