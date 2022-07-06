const mssql = require("mssql/msnodesqlv8");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const config = new mssql.ConnectionPool({
  database: "social_media",
  server: "BENSON-LAPTOP\\SQLEXPRESS",
  driver: "SQL Server",
  options: {
    trustedConnection: true,
  },
});

async function poolPromise() {
  const pool = config.connect();
  if (pool) {
    console.log("database connected");
    return pool;
  }
}

module.exports = poolPromise;
