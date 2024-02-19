import express from "express";
import { createShift, deleteShift, getShifts, getShiftsById, updateShift } from "../controllers/ShiftController.js";

const router = express.Router();

router.get("/shifts", getShifts);
router.get("/shifts/:id", getShiftsById);
router.post("/shifts", createShift);
router.patch("/shifts/:id", updateShift);
router.delete("/shifts/:id", deleteShift);

export default router;
