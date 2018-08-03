const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require ('mongoose');

//setup environment variables
dotenv.config();

//connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });


// setup our port
const port = process.env.PORT || 8008;

// power ups (middleware)

//models
const Food = mongoose.model('Food', { type: String, color: String, weight: Number });

// routes (get, create, update, delete)

// get all foods
server.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json({
            "foods": foods
        })
    } catch(err) {
        res.status(500).json({
            msg: 'stuff is broken'
        });
    }
});
// get one special food by id
server.get('/foods/:id', (req, res) => {
    res.send(`get ${req.params.id} food`);
});
// create new food
server.post('/foods', (req, res) => {
    res.send(`creating a new food`);
});
//update one special food by id
server.put('/foods/:id', (req, res) => {
    res.send(`updating ${req.params.id} food`);
});
//delete one special food by id
server.delete('/foods/:id', (req, res) => {
    res.send(`deleting ${req.params.id} food`);
});

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});