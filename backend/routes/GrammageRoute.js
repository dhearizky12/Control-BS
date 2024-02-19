import express from "express";
import { createGrammage, deleteGrammage, getGrammages, getGrammagesById, updateGrammage } from "../controllers/GrammageController.js";

const router = express.Router();

router.get("/grammages", getGrammages);
router.get("/grammages/:id", getGrammagesById);
router.post("/grammages", createGrammage);
router.patch("/grammages/:id", updateGrammage);
router.delete("/grammages/:id", deleteGrammage);

export default router;
