const { Pool } = require('pg');

var DATABASE_URL = 'postgres://pg-user:1234@127.0.0.1:5432/pg-user';

const pool = new Pool({
    connectionString: DATABASE_URL
  });
  
  // a generic query, that executes all queries you send to it
  function query(text) {
    return new Promise((resolve, reject) => {
      pool
        .query(text)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  module.exports = {
    query
  };
  