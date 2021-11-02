// Require Dependencies
require('dotenv').config();
const { DATABASE_URL, PORT = 3001 } = process.env;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Initialize Express
const app = express();

// Configure Application Settings


// Connect to MongoDB
// require mongoose

const mongoose = require('mongoose');
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));
db.on('error', () => console.log(`An Error Has Occurred with MongoDB: ${error.message}`));


// Set up model 
const Schema = mongoose.Schema;
const wishSchema = new Schema({
    product: String,
    image: String,
    price: Number
}, { timestamps: true });

const wish = mongoose.model('wish', wishSchema);

// Set up MongoDB Listeners

// Mount Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Mount Routes
app.get('/', (req, res) => res.send('Hello World'));

// Index Route
app.get('/wish', async (req, res) => {
    // const wish = await wish.find({});
    // res.json(wish);
    try {
        res.json(await wish.find({}));
    } catch (error) {
       res.status(400).json(error); 
    }
});

// Delete Route

app.delete('/wish/:id', async (req, res) => {
    try {
        res.json(await wish.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update Route
app.put('/wish/:id', async (req, res) => {
    try {
        res.json(await wish.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create Route
app.post('/wish', async (req, res) => {
    try {
        res.json(await wish.create(req.body));
        // const person = await People.create(req.body);
        // res.json(person);
    } catch (error) {
        res.status(400).json(error);
    }
});


// Tell App to Listen
app.listen(PORT, () => console.log(`Wish List is obtainable on local store at :${PORT}`));