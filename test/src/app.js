const express = require('express');
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

app.use("*", (req, res) => res.status(404).json({ message: "Not found" }));

module.exports = app;