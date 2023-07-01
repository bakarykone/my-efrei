import Cours from "../models/cours.js";

// Récupérer tous les cours
export const getAllCours = async (req, res) => {
    try {
      const cours = await Cours.find();
      res.json(cours);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des cours.' });
    }
  };
  
  // Créer un nouveau cours
  export const createCours = async (req, res) => {
    const { name } = req.body;
  
    try {
      const cours = new Cours({ name });
      await cours.save();
      res.json(cours);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du cours.' });
    }
  };
  
  // Récupérer un cours par son ID
  export const getCoursById = async (req, res) => {
    const { id: _id } = req.params;
  
    try {
      const cours = await Cours.findById(_id);
      if (!cours) {
        return res.status(404).json({ error: 'Cours non trouvé.' });
      }
      res.json(cours);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération du cours.' });
    }
  };
  
  // Mettre à jour un cours
  export const updateCours = async (req, res) => {
    const { id: _id } = req.params;
    const { name } = req.body;
  
    try {
      const updatedCours = await Cours.findByIdAndUpdate(
        _id,
        { name },
        { new: true }
      );
      if (!updatedCours) {
        return res.status(404).json({ error: 'Cours non trouvé.' });
      }
      res.json(updatedCours);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du cours.' });
    }
  };
  
  // Supprimer un cours
  export const deleteCours = async (req, res) => {
    const { id: _id } = req.params;
  
    try {
      const deletedCours = await Cours.findByIdAndRemove(_id);
      if (!deletedCours) {
        return res.status(404).json({ error: 'Cours non trouvé.' });
      }
      res.json({ message: 'Cours supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du cours.' });
    }
  };