const path = require('path');
const exec = require('./exec');

exec.exec(path.resolve(__dirname, '../build/'), path.join(__dirname, '../api/'))
  .then(e => console.log(e))
  .catch(err => console.log(err));
