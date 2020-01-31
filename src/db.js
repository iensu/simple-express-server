const pgPromise = require("pg-promise");
const config = require("./config");

class Database {
  static db;

  constructor(initOptions = {}) {
    if (!Database.db) {
      const pgp = pgPromise(initOptions);
      Database.db = pgp(config.DATABASE_URL);
    }
  }

  get db() {
    return Database.db;
  }

  async initialize() {
    await this.db.any(
      `CREATE TABLE IF NOT EXISTS my_table ( name text PRIMARY KEY )`
    );
  }

  async add(name) {
    return this.db.oneOrNone(`INSERT INTO my_table (name) VALUES ($<name>)`, {
      name
    });
  }

  async list() {
    return this.db.manyOrNone(`SELECT * FROM my_table`);
  }
}

module.exports = { Database };
