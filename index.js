const mongoose = require('mongoose');
// connect mongoose to database in MongoDB
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    // where movieApp is- can change to what you want, if it's not there it will create it
    .then(() => {
        console.log("CONNECTION OPEN")
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err)
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// model
const Movie = mongoose.model('Movie', movieSchema)
// model name (here it's Movie) must be singular and start with a capital letter
// mongoose will create a collection called movies
// make new instances of this
//const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' })


// Movie.insertMany([
//     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
//     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
//     { title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' }
// ])
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data)
//     })

