const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log('MongoDB connection established!');
});

app.use(express.json());
app.use(cors());

////////////////////////////////////////////////////////////

app.use('/users', require('./routes/userRouter'));

app.use('/watchlist', require('./routes/watchlistRouter'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on port ${PORT}`))