const mongoose = require('mongoose');
const Schema = mongoose.Schema; //is the schema class
const foodSchema = new Schema({
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      require: true
    },
    weight: {
      type: Number,
      min: 0,
      max: 100,
      trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
  });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;