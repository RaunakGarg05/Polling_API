const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    ' ') //mongodb_key
    .then(() => {
        console.log('MongoDb Connected!!');
    })
    .catch(err => console.log(err));
