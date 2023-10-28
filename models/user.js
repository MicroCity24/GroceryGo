import mongoose from "mongoose";
import Joi from "joi";

const photoSchema = new mongoose.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String,
    },
});

const Photo = mongoose.model('Photo', photoSchema);

//model pentru user
const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: "user",
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    moneySaved: {
        type: Number,
        default: 0,
    },
    profilePhoto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    },
});
//model pentru produs
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    }
})

const Product = mongoose.model('Product', productSchema);
//model pentru magazin
const marketSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: "market",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    //Se creaza un array de obiecte bazate pe modelul de produs
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produyct',
    }],
    profilePhoto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    },
})

// se creaza variabile dupa modlele de sus pentru a putea fi folosite in restul aplicatiei
const User = mongoose.model("User", userSchema);
const Market = mongoose.model("Market", marketSchema);

// functie de validare pentru user
function validateUser(user) {
    const schema = Joi.object().keys({
        username: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })

    return schema.validate(user);
}

// functie de validare pentru magazin
function validateMarket(market){
    const schema = Joi.object().keys({
        name: Joi.string().max(150).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })

    return schema.validate(market);
}

//export la cele 2 variabile respectiv functii pentru a putea fi accesate in restul aplicatiei unde este nevoie 
export {User, Market, validateUser, validateMarket};