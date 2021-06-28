const mongoose = require('mongoose');
// connect mongoose to database in MongoDB
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    // where shopApp is- can change to what you want, if it's not there it will create it
    .then(() => {
        console.log("CONNECTION OPEN")
    })
    .catch(err => {
        console.log("OH NO ERROR!")
        console.log(err)
    })
// validators
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be positive!"] // "Price must be positive!" will show if the validation fails
    },  // if only using type can use shorthand price: Number
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String], // an array on consisting of strings- shorthand (longer type: [String])
    qty: {
        online:
        {
            type: Number,
            default: 0
        },
        inStore:
        {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale; // find product and change it from true to false or false to true
    return this.save(); // save it- but need to await it in asyns function as it takes time
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save(); // behaves like a promise
}

productSchema.methods.greet = function () {
    console.log("Hello, Hi, Howdy")
    console.log(`from ${this.name}`) // e.g. from Tire Pump
}

// static 
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
    // {} - update all, {onSale: true, price: 0} - to these values
}
const Product = mongoose.model('Product', productSchema)

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Tire Pump' })
    // errors- usually use try and catch in an async function- not going to bother here
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);

}
// findProduct(); 
// above calls the async function

Product.fireSale().then(res => console.log(res))


//const bike = new Product({ name: 'Mountain Bike', price: 599, categories: ['Cycling', 'Safety'] })
// bike.save()
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err);
//     })

// const bike = new Product({ name: 'Tire Pump', price: 19.99, categories: ['Cycling', 'Safety'] })
// bike.save()
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err);
//     })

// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'XS' })
// bike.save()
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err);
//     })

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -20.99 }, { new: true, runValidators: true })
//     // new: true - shows new data when you update it
//     // runValidators: true - validators are on so that the productSchema above will validate it 
//     // e.g. if price is below 0 (used the built in validator min for this above) an error will show
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err);
//     })

