import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: {type: Array, default: [], required: true},
    instructions: {type: String, required: true},
    rating: {type: Number, default: 0},
})

module.exports = mongoose.model("Recipe", RecipeSchema);