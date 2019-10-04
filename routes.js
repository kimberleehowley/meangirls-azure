// Our routes specify what data is returned with our specific API calls 
const express = require('express'); 
const router = express.Router(); 
const records = require('./records'); 

// Helper function that wraps another function in try/catch and passes errors to middleware 
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next); 
        } catch (err) {
            next(err);
        }
    };
}

// Send a GET request to read all quotes
router.get("/quotes", asyncHandler(async(req, res) => {
    const quotes = await records.getQuotes(); 
    res.json(quotes);
})); 

// Send a GET request to read a random quote
router.get("/quotes/random", asyncHandler(async(req, res) => {
    const quote = await records.getRandomQuote(); 
    res.json(lyric); 
})); 

module.exports = router; 