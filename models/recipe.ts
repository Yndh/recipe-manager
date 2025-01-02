import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: {type: [String], required: true},
    instructions: {type: [String], required: true},
    rating: {type: Number, default: 0, max: 5},
})

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;