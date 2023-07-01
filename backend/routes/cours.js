import express from "express";
import {
  getAllCours,
  getCoursById,
  createCours,
  updateCours,
  deleteCours,
} from "../controllers/cours.js";

const router = express.Router();

router.get("/", getAllCours);
router.post("/", createCours);
router.get("/:id", getCoursById);
router.put("/:id", updateCours);
router.delete("/:id", deleteCours);

export default router;