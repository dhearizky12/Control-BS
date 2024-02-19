import express from "express";
import { createProduction, deleteProduction, getProductions, getProductionsById, updateProduction } from "../controllers/ProductionController.js";

const router = express.Router();

router.get("/productions", getProductions);
router.get("/productions/:id", getProductionsById);
router.post("/productions", createProduction);
router.patch("/productions/:id", updateProduction);
router.delete("/productions/:id", deleteProduction);

export default router;
