const dotEnv = require('dotenv');

dotEnv.config();

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: "wahkart-db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {},
  production: {
    use_env_variable: "DATABASE_URL"
  }
}
