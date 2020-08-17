const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(fileUpload({
    safeFileNames : true,
    createParentPath: true,
    preserveExtension: true,
    limits: { fileSize: 50 * 1024 * 1024 } //50Mo

}));

app.use('/api/auth', userRoutes);
app.use('/api/articles', articleRoutes);

module.exports = app;
