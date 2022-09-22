const app = require('./app');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 4002;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});