// Requiring our environment variables 
require('dotenv').config()

// Using Express, a server framework for Node 
const express = require('express'); 
const app = express(); 

// We'll use routes in the future for our API 
//const routes = require('./routes')

app.use(express.json()); 
//app.use('/api', routes); 

// Custom middleware, throws an error when resource not found
// Makes our code more DRY so we don't have to repeat this within every route 
app.use((req, res, next) => {
    const err = new Error("Not found.") 
    err.status = 404; 
    next(err);
});

// Custom error handler 
app.use((err, req, res, next) => {
    res.status(err.status || 500); 
    res.json({
        error: {
            message: err.message
        }
    }); 
}); 

// Preparing our port as an environment variable, which could be handy for Heroku 
const port = process.env.PORT || 5000; 

// Telling the app where to listen
app.listen(port, () => console.log(`Mean Girls quotes for Azure demo listening on http://localhost:${port}!`)); 