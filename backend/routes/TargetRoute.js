import express from "express";
import { createTarget, deleteTarget, getTargets, getTargetsById, updateTarget } from "../controllers/TargetController.js";

const router = express.Router();

router.get("/targets", getTargets);
router.get("/targets/:id", getTargetsById);
router.post("/targets", createTarget);
router.patch("/targets/:id", updateTarget);
router.delete("/targets/:id", deleteTarget);

export default router;
