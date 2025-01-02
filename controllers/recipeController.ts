import {Request, Response} from "express";
import Recipe from "../models/recipe";

export const getRecipies = async (req: Request, res: Response) => {
    try{
        const recepies = await Recipe.find()

        res.json(recepies)
    }catch(err){
        console.error(`getRecipies error: ${err}`)
        res.status(500).json({error: "Error getting recipes"})
    }
}

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
        console.log(req.body)
        let { name, ingredients, instructions, rating} = req.body

        if(!name || !ingredients || ingredients.length < 1 || !instructions || instructions.length < 1 || !rating) return res.status(400).json({error: "Invalid input data"})

        if(typeof rating !== "number"){
            try{
                rating = parseInt(rating)
                if(typeof rating !== "number") return res.status(400).json({error: "Invalid input data"})
            }catch(err){
                console.error(`createRecipe error: ${err}`)
                return res.status(400).json({error: "Invalid input data"})
            }
        }
        if(rating > 5){
            return res.status(400).json({error: "Max rating is 5"})
        }
        name = name.trim()

        const newRecipe = await Recipe.create({name, ingredients, instructions, rating})

        res.status(200).json(newRecipe)
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

        if(rating && typeof rating !== "number"){
            try{
                rating = parseInt(rating)
                if(typeof rating !== "number") return res.status(400).json({error: "Invalid input data"})
            }catch(err){
                console.error(`createRecipe error: ${err}`)
                return res.status(400).json({error: "Invalid input data"})
            }
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