import Classe from "../models/classe.js";

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classe.find().populate("students");
    res.json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des classes." });
  }
};

// Créer une nouvelle classe
export const createClasse = async (req, res) => {
  const { name, students } = req.body;
  console.log(req.body);
  try {
    const newClasse = new Classe({ name, students });
    await newClasse.save();
    res.json(newClasse);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la classe." });
  }
};

// Récupérer une classe par son ID
export const getClasseById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const foundClasse = await Classe.findById(_id).populate("students");
    if (!foundClasse) {
      return res.status(404).json({ error: "Classe non trouvée." });
    }
    res.json(foundClasse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la classe." });
  }
};

// Mettre à jour une classe
export const updateClasse = async (req, res) => {
  const { id: _id } = req.params;
  const { name } = req.body;
  console.log(name);
  try {
    const updatedClasse = await Classe.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    );
    if (!updatedClasse) {
      return res.status(404).json({ error: "Classe non trouvée." });
    }
    res.json(updatedClasse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la classe." });
  }
};

// Supprimer une classe
export const deleteClasse = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const deletedClasse = await Classe.findByIdAndRemove(_id);
    if (!deletedClasse) {
      return res.status(404).json({ error: "Classe non trouvée." });
    }
    res.json({ message: "Classe supprimée avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la classe." });
  }
};
