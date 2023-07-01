import Student from "../models/student.js";
import Classe from "../models/classe.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('classe', 'name');
    res.json(students);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des étudiants." });
  }
};

// Créer un nouvel étudiant
export const createStudent = async (req, res) => {
  const { name, age, classe } = req.body;
  try {
    const student = new Student({ name, age, classe });
    await student.save();

    // Ajouter l'ID de l'étudiant à la classe correspondante
    await Classe.findByIdAndUpdate(classe, {
      $push: { students: student._id },
    });

    // Récupérer le nom de la classe
    const classeData = await Classe.findById(classe);
    const className = classeData.name;

    res.json({ ...student._doc, classe: className });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'étudiant." });
  }
};

// Récupérer un étudiant par son ID
export const getStudentById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const student = await Student.findById(_id);
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé." });
    }
    res.json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'étudiant." });
  }
};

// Mettre à jour un étudiant
export const updateStudent = async (req, res) => {
  const { id: _id } = req.params;
  const { name, age, classe } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      _id,
      { name, age, classe },
      { new: true }
    );
    console.log(student)
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé." });
    }

    // Mettre à jour la référence de la classe dans le modèle de classe
    await Classe.findByIdAndUpdate(student.classe, {
      $pull: { students: student._id },
    });
    await Classe.findByIdAndUpdate(classe, {
      $push: { students: student._id },
    });

    res.json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'étudiant." });
  }
};

// Supprimer un étudiant
export const deleteStudent = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const student = await Student.findByIdAndRemove(_id);
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé." });
    }

    // Supprimer l'ID de l'étudiant de la classe correspondante
    await Classe.findByIdAndUpdate(student.classId, {
      $pull: { students: student._id },
    });

    res.json({ message: "Étudiant supprimé avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'étudiant." });
  }
};
