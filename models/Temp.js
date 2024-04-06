const mongoose = require("mongoose")
const { Schema } = mongoose

const DishReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  userid: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
  // username: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User',
  //   required: true
  // }
})


function createReviewModelForDish(dishName) {
    return mongoose.model(`${dishName}Review`, DishReviewSchema, `${dishName}Reviews`);
}

module.exports = createReviewModelForDish