import express from "express";
import {
  getAllClasses,
  getClasseById,
  createClasse,
  updateClasse,
  deleteClasse,
} from "../controllers/classe.js";

const router = express.Router();

router.get('/', getAllClasses);
router.post('/', createClasse);
router.get('/:id', getClasseById);
router.put('/:id', updateClasse);
router.delete('/:id', deleteClasse);

export default router;