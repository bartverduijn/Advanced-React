const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
// const db = require('./db');

const server = createServer();

// Use express middlware to handle cookies (JWT)
server.express.use(cookieParser());

// Decode th JWT so we can get User ID on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        // if there is a token, check if it's a correct one
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // put userId onto the request for future requests to access
        req.userId = userId;
    }
    next();
});

// TODO Use express middlware to populate current user

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL,
        },
    },
    data => {
        console.log(`💻  Server is now running on port http://localhost:${data.port}`);
    }
);
