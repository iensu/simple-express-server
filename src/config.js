const Envalid = require("envalid");

module.exports = Envalid.cleanEnv(
  process.env,
  {
    PORT: Envalid.num({ default: 4321 })
  },
  { strict: true }
);
