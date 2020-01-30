const express = require("express");

const port = process.env.PORT || 4321;

const app = express();

app.get("/hej", (_req, res) => {
  console.log("Got a request! :D");
  res.status(200).send("hopp");
});

// Exit cleanly when interrupted
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
