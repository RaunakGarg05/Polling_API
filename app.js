const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/database');
const pollingRoutes = require('./routes/polling');

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.use('/polling', pollingRoutes);
const port = 4000;
app.listen(port, ()=> {
    console.log('server started !!');
});