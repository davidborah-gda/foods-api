const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//setup environment variables
dotenv.config();

//connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });


// setup our port
const port = process.env.PORT || 8008;

// power ups (middleware)
server.use(helmet());
server.use(morgan("combined"));
server.use(bodyParser.json());  //accepts json data
server.use(bodyParser.urlencoded( { extended: true } ));  //accept html form data

//models
const Food = require('./models/food');

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
server.get('/foods/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foods = await Food.find({ _id: id });
        res.status(200).json({
            foods: foods
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Stuff still broke!!!'
        });
    }
});
// create new food
server.post('/foods', async (req, res) => {
    const { type, color, weight } = req.body;
    try {
        const food = new Food({ type, color, weight });
        await food.save();
        res.status(201).json({
            msg: "Saved Food",
            food
        }); 
    } catch (error) {
        res.status(500).json({
            msg: "Food not Created"
        })
    }
});
//update one special food by id
server.put('/foods/:id', async (req, res) => {
    const { id } = req.params;
    const { type, color, weight } = req.body;
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, { type, color, weight }, { new: true });
        res.status(200).json({
            msg: "Update Successful",
            food: updatedFood
        });
    } catch (error) {
        res.status(500).json({
            msg: "Updated No Happen"
        });
        
    }
});
//delete one special food by id
server.delete('/foods/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndRemove(id);
        res.status(200).json({
            msg: "yayyy destruction"
        });
    }   catch (err) {
        res.status(500).json({
            msg: "broked"
        });
    }
});

// kick it off
server.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});