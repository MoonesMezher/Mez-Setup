const content = {
expressAppCode: 
`const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

// Routes
const userRouter = require('./routes/users.routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));

app.use('/api/users', userRouter);

module.exports = app;`,

expressServerCode: 
`require('dotenv').config();

const app = require('./app');

const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT,'0.0.0.0', () => {
            console.log("Server is listening on port http://localhost:"+PORT);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });`,

expressEnvCode: 
`PORT="3000"
MONGO_URI='mongodb://127.0.0.1:27017/mez-express-app'
JWT_SECRET_KEY="12345"`,

expressRouteApp: 
`const express = require('express');
const router = express.Router();

// Methods
const usersController = require('../controllers/users.controllers');

// POST
router.post('/login', usersController.loginAdmin);

module.exports = router;`,

expressUserModel: 
`const { Schema, model } = require('mongoose');

const User = model("User", new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps : true }));

module.exports = model("User") || User;`,

expressUsersController: 
`const User = require('../models/User');

const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken');

const createToken = (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_SECRET_KEY);
}

const usersController = {
    // login user
    loginAdmin: async (req, res) => {    
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({state: "failed", message: 'All data must be required'})
        }

        if(typeof email !== 'string') {
            return res.status(400).json({state: "failed", message: 'Email must be string'})
        }

        if(typeof password !== 'string') {
            return res.status(400).json({state: "failed", message: 'Password must be string'})
        }

        let user = await User.findOne({email}); 
        
        if(!user) {
            return res.status(400).json({state: "failed", message: 'Incorrect email'})
        }

        const match = passwordHash.verify(password, user.password);

        if(!match) {
            return res.status(400).json({state: "failed", message: "Incorecct password"})
        }

        try {
            const token = createToken(user._id, user.email);

            res.status(200).json({state: "success", message: "Logged in successfully", token});
        } catch (error) {
            res.status(400).json({state: "failed", message: error.message})
        }
    }
}

module.exports = usersController;`,

expressGenerateJWTSecretKey: 
`const crypto = require('crypto');

const key = crypto.randomBytes(32).toString('hex')

console.table({key});`,
middlewareCheckFromId:
`const { mongoose } = require("mongoose");

const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).send({ state: 'failed', message: 'Id must be exist' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ state: 'failed', message: 'Invalid Id' });
    }
        
    next();
};

module.exports = validateObjectId;`
}

module.exports = content