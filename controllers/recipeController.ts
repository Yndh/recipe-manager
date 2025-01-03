import {Request, Response} from "express";
import Recipe from "../models/recipe";

export const getRecipies = async (req: Request, res: Response) => {
    try{
        const recipies = await Recipe.find()
        if(!recipies) return res.status(404).send("No recipies found")

        res.status(200).json(recipies)
    }catch(err){
        console.error(`getRecipies error: ${err}`)
        res.status(500).json({error: "Error getting recipes"})
    }
}

export const getRecipiesByRating = async (req: Request, res: Response) => {
    try{
        let {rating} = req.params
        const {gte, lte} = req.query

        rating = parseInt(rating);
        if (isNaN(rating)) {
            return res.status(400).json({ error: "Invalid rating" });
        }
        if(rating > 5){
            return res.status(400).json({error: "Max rating is 5"})
        }

        let query = { rating: rating }
        if(gte) query = { rating: { $gte: rating } }
        if(lte) query = { rating: { $lte: rating } }

        const recipies = await Recipe.find(query)
        if(!recipies) return res.status(404).send("No recipies found")

        res.status(200).json(recipies)


    }catch(err){
        console.error(`getRecipiesByRating error: ${err}`)
        res.status(500).json({error: "Error getting recipies"})
    }
}

export const getRecipesByIngredientCount = async (req: Request, res: Response) => {
    try {
        let {count} = req.params
        const {gte, lte } = req.query;

        count = parseInt(count);
        if (isNaN(count)) {
            return res.status(400).json({ error: "Invalid count" });
        }

        let query: any = { ingredients: { $size: +count } };
        if (gte) query = { $expr: { $gte: [{ $size: "$ingredients" }, count] } };
        if (lte) query = { $expr: { $lte: [{ $size: "$ingredients" }, count] } };

        const recipes = await Recipe.aggregate([{$match: query}]);

        if (!recipes || recipes.length === 0) {
            return res.status(404).send("No recipes found");
        }

        res.status(200).json(recipes);
    } catch (err) {
        console.error(`getRecipesByIngredientCount error: ${err}`);
        res.status(500).json({ error: "Error getting recipes" });
    }
};

export const getRecipesByInstructionsCount = async (req: Request, res: Response) => {
    try {
        let {count} = req.params
        const {gte, lte } = req.query;

        count = parseInt(count);
        if (isNaN(count)) {
            return res.status(400).json({ error: "Invalid count" });
        }

        let query: any = { instructions: { $size: +count } };
        if (gte) query = { $expr: { $gte: [{ $size: "$instructions" }, count] } };
        if (lte) query = { $expr: { $lte: [{ $size: "$instructions" }, count] } };

        const recipes = await Recipe.aggregate([{$match: query}]);

        if (!recipes || recipes.length === 0) {
            return res.status(404).send("No recipes found");
        }

        res.status(200).json(recipes);
    } catch (err) {
        console.error(`getRecipesByInstructionsCount error: ${err}`);
        res.status(500).json({ error: "Error getting recipes" });
    }
};

export const getRecipeById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params

        const recipe = await Recipe.findById(id)
        if(!recipe) return res.status(404).json({error: "Recipe not found"})

        res.status(200).json(recipe)
    }catch(err){
        console.error(`getRecipeById error: ${err}`)
        res.status(500).json({error: "Error getting recipe"})
    }
}

export const createRecipe = async (req: Request, res: Response) => {
    try{
        const recipes = Array.isArray(req.body) ? req.body : [req.body]

        const createdRecipes = []
        for(let data of recipes){
            let { name, ingredients, instructions, rating} = data

            if(!name || !ingredients || ingredients.length < 1 || !instructions || instructions.length < 1 || !rating) return res.status(400).json({error: "Invalid input data"})

            rating = parseInt(rating);
            if (isNaN(rating)) {
                return res.status(400).json({ error: "Invalid rating" });
            }
            if(rating > 5){
                return res.status(400).json({error: "Max rating is 5"})
            }
            name = name.trim()

            const newRecipe = await Recipe.create({name, ingredients, instructions, rating})
            createdRecipes.push(newRecipe)
        }

        res.status(200).json(createdRecipes.length === 1 ? createdRecipes[0] : createdRecipes);
    }catch(err){
        console.error(`createRecipe error: ${err}`)
        res.status(500).json({error: "Error creating recipe"})
    }
}

export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        let {name, ingredients, instructions, rating} = req.body

        const recipe = await Recipe.findById(id)
        if (!recipe) return res.status(404).json({error: "Recipe not found"})

        rating = parseInt(rating);
        if (isNaN(rating)) {
            return res.status(400).json({ error: "Invalid rating" });
        }
        if(rating > 5){
            return res.status(400).json({error: "Max rating is 5"})
        }

        if(name) recipe.name = name.trim()
        if(ingredients && ingredients.length > 0) recipe.ingredients = ingredients
        if(instructions && instructions.length > 0) recipe.instructions = instructions
        if(rating) recipe.rating = rating

        const updatedRecipe = await recipe.save()

        res.status(200).json(updatedRecipe)

    }catch(err){
        console.error(`updateRecipe error: ${err}`)
        res.status(500).json({error: "Error updating recipe"})
    }
}

export const deleteRecipe = async (req: Request, res: Response) => {
    try{
        const {id} = req.params

        const recipe = await Recipe.findById(id)
        if (!recipe) return res.status(404).json({error: "Recipe not found"})

        await recipe.deleteOne({ _id: id })

        res.status(200).json({success: true})
    }catch(err){
        console.error(`deleteRecipe error: ${err}`)
        res.status(500).json({error: "Error deleting recipe"})
    }
}