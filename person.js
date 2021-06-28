const mongoose = require('mongoose');
// connect mongoose to database in MongoDB
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN")
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err)
    })

// validators
const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

personSchema.pre('save', async function () { // asyns creates promise
    console.log("About to Save")
})

personSchema.post('save', async function () { // asyns creates promise
    console.log("Just Saved")
})

// make model
const Person = mongoose.model('Person', personSchema);

