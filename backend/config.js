const { Client } = require('pg')
const client = new Client({
  user: 'rrglvvms',
  host: 'rosie.db.elephantsql.com',
  password: 'YGJ41kYvYiLmtXsdCBo0ky2g2cQO3H8X',
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client ;
