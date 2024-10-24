const { server } = require('../index'); // Import the Express server
module.exports = (req, res) => {
server.emit('request', req, res); // Handle incoming requests
 
