import express from "express";
import {
    getRecipeById,
    getRecipies,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipiesByRating, getRecipesByIngredientCount
} from "../controllers/recipeController";

const router = express.Router();

router.get("/", getRecipies)
router.get("/:id", getRecipeById)
router.post("/", createRecipe)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

router.get("/rating/:rating", getRecipiesByRating)

router.get("/ingredients/:count", getRecipesByIngredientCount)


export default router;