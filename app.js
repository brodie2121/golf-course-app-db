const express = require('express');
    path = require('path');
    cookieParser = require('cookie-parser');
    logger = require('morgan');
    cors = require('cors');

const indexRouter = require('./routes/index');
    usersRouter = require('./routes/users');
    dailyJobBoardRouter = require('./routes/dailyJobBoard');
    employeeRouter = require('./routes/employee');
    sprayChartRouter = require('./routes/sprayChart');

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/dailyjobboard', dailyJobBoardRouter);
app.use('/employee', employeeRouter);
app.use('/spraychart', sprayChartRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
