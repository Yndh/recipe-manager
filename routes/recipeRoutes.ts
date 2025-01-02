import express from "express";
import {Request, Response} from "express";
import {getRecipeById, getRecipies, createRecipe, updateRecipe, deleteRecipe} from "../controllers/recipeController";

const router = express.Router();

router.get("/", getRecipies)
router.get("/:id", getRecipeById)
router.post("/", createRecipe)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)


export default router;