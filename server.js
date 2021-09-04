const express = require('express');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();

// create express app
const app = express();

// Setup server port
const port = process.env.PORT;

// CORS
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

app.use(function(err, req, res, next) {
    // error handling logic
    console.error(err.stack);
    res.status(500).json({ msg: "something wrong" });

});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "hello world" });
});


// auth routes
const youtubeRoutes = require('./routes/youtube.routes');
app.use('/api/youtube', youtubeRoutes);

// const profileRouter = require('./routes/profile.routes');
// app.use('/api/profile', profileRouter);

// // partent routes
// const parentRouter = require('./routes/parent.routes');
// app.use('/api/parents', parentRouter);

// // bill routes
// const billRouter = require('./routes/bill.routes');
// app.use('/api/bills', billRouter);



// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});