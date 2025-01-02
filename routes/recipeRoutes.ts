import express from "express";
import {
    getRecipeById,
    getRecipies,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipiesByRating, getRecipesByIngredientCount, getRecipesByInstructionsCount
} from "../controllers/recipeController";

const router = express.Router();

router.get("/", getRecipies)
router.get("/:id", getRecipeById)
router.post("/", createRecipe)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

router.get("/rating/:rating", getRecipiesByRating)

router.get("/ingredients/:count", getRecipesByIngredientCount)
router.get("/instructions/:count", getRecipesByInstructionsCount)


export default router;