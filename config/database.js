const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb+srv://Raunak:QnxTw9QqkWVzPWoP@cluster0.ahcow.mongodb.net/poll?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDb Connected!!');
    })
    .catch(err => console.log(err));