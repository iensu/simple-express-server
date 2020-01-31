require("dotenv").config({ path: ".env" });

const express = require("express");
const config = require("./src/config");
const { Database } = require("./src/db");

(async function startServer() {
  const db = new Database();
  await db.initialize();

  const app = express();

  app.use(express.json());

  app.get("/hej", (_req, res) => {
    console.log("Got a request! :D");
    res.status(200).send("hopp");
  });

  app.post("/db", async (req, res) => {
    const name = req.body && req.body.name;

    if (!name) {
      res.sendStatus(400);
    }

    const result = await db.add(name);

    res.json(result);
  });

  app.get("/db", async (_req, res) => {
    const things = await db.list();

    res.json(things);
  });

  // Exit cleanly when interrupted
  process.on("SIGINT", () => process.exit(0));
  process.on("SIGTERM", () => process.exit(0));

  app.listen(config.PORT, () => {
    console.log(`Server is running at: http://localhost:${config.PORT}`);
  });
})();
