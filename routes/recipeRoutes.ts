import express from "express";
import {Request, Response} from "express";
import {
    getRecipeById,
    getRecipies,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipiesByRating, getRecipiesByRatingGTE, getRecipiesByRatingLTE
} from "../controllers/recipeController";

const router = express.Router();

router.get("/", getRecipies)
router.get("/:id", getRecipeById)
router.post("/", createRecipe)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

router.get("/rating/:rating", getRecipiesByRating)
router.get("/rating/gte/:rating", getRecipiesByRatingGTE)
router.get("/rating/lte/:rating", getRecipiesByRatingLTE)


export default router;