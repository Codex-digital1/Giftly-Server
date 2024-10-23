const { server } = require('../index');  
module.exports = (req, res) => {
  server.emit('request', req, res);  
};
