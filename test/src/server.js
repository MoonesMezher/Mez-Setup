require('dotenv').config();

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
    });