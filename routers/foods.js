const express = require('express');
const router = express.Router();//tiny lego brick
const Food = require('../models/food');

// routes (get, create, update, delete)

// get all foods
router.get('/foods', async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.status(200).json({
            "foods": foods
        })
    } catch(err) {
        next(err);
    }
});
// get one special food by id
router.get('/foods/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const foods = await Food.find({ _id: id });
        res.status(200).json({
            foods: foods
        });
    } catch (error) {
        next(err);
    }
});
// create new food
router.post('/foods', async (req, res, next) => {
    const { type, color, weight, createdAt } = req.body;
    try {
        const food = new Food({ type, color, weight, createdAt });
        await food.save();
        res.status(201).json({
            msg: "Saved Food",
            food
        }); 
    } catch (error) {
        next(err);
    }
});
//update one special food by id
router.put('/foods/:id', async (req, res, next) => {
    const { id } = req.params;
    const { type, color, weight, createdAt } = req.body;
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, { type, color, weight, createdAt }, { new: true });
        res.status(200).json({
            msg: "Update Successful",
            food: updatedFood
        });
    } catch (error) {
        next(err);
        
    }
});
//delete one special food by id
router.delete('/foods/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndRemove(id);
        res.status(200).json({
            msg: "yayyy destruction"
        });
    }   catch (err) {
        next(err);
    }
});

module.exports = router;