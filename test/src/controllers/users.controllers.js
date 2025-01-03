const User = require('../models/User');

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

module.exports = usersController;