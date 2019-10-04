// We use this to read our data.json file, which we're using for a quick fix 
const fs = require('fs');

// To generate a random ID 
function generateRandomId(){
    return Math.floor(Math.random() * 10000);
}

// Saves and reads our data
function save(data){
    return new Promise((resolve, reject) => {
        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err); 
            } else {
                resolve(); 
            }
        });
    });
}

// Returns all quotes 
function getQuotes() {
    return new Promise((resolve, reject) => {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                reject(err); 
            } else {
                const json = JSON.parse(data); 
                resolve(json); 
            }
        });
    });
}

// Get unique lyric by id 
async function getQuote(id) {
    const quotes = await getQuotes(); 
    return quotes.quoteList.find(quote => quote.id == id); 
}

// Get a random quote 
async function getRandomQuote(){
    const quotes = await getQuotes(); 
    const randNum = Math.floor(Math.random() * quotes.quoteList.length);
    return quotes.quoteList[randNum]
}

// Exports functions 
module.exports = {
    getQuotes, 
    getQuote, 
    getRandomQuote
}