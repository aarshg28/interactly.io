//require app 
const express = require('express');
const morgan = require('morgan');
const db = require('./db/db');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactsRoutes');
const app = express();

let PORT = 4200;
let host = 'localhost';
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use('/', contactRoutes);

//404 error handler
app.use((req, res, next) => {
    let err = new Error('The Server Cannot locate' + req.url);
    err.status = 404;
    next(err);
});


// 500 error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal server error");
    }
    res.status(err.status);
});

//start the server

//Connect db
//db.sequelize.sync({ force: true })
db.db.then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, host, () => {
        console.log('The server is running at port', PORT);
    });

}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
