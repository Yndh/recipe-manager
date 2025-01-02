import express from "express";
import mongoose from "mongoose";
import {Request, Response} from "express";
import recipeRoutes from "./routes/recipeRoutes";

const app = express();
const MONGO_URI = 'mongodb://localhost:27017/RecipeManager'
const PORT: number = 3000

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err: Error) => { console.log(`Failed to connect to MongoDB (${err})`) });

app.use(express.json());

app.use("/", recipeRoutes)

app.use((req: Request, res: Response) => {
    res.status(404).json({error: "Endpoint not found"});
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})