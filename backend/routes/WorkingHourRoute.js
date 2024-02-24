import express from "express";
import { createWorkingHour, deleteWorkingHour, getWorkingHours, getWorkingHoursById, updateWorkingHour } from "../controllers/WorkingHourController.js";

const router = express.Router();

router.get("/working-hours", getWorkingHours);
router.get("/working-hours/:id", getWorkingHoursById);
router.post("/working-hours", createWorkingHour);
router.patch("/working-hours/:id", updateWorkingHour);
router.delete("/working-hours/:id", deleteWorkingHour);

export default router;
