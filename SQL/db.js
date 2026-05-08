const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.nxzhxmqcvtxancxykvpa:xQ2GlBzJFJC9sFOR@aws-1-us-west-2.pooler.supabase.com:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
