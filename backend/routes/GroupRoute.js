import express from "express";
import { createGroup, deleteGroup, getGroups, getGroupsById, updateGroup } from "../controllers/GroupController.js";

const router = express.Router();

router.get("/groups", getGroups);
router.get("/groups/:id", getGroupsById);
router.post("/groups", createGroup);
router.patch("/groups/:id", updateGroup);
router.delete("/groups/:id", deleteGroup);

export default router;
