import Note from "../models/note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate('student', 'name') 
      .populate('cours', 'name'); 
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notes.' });
  }
};
  
  // Créer une nouvelle note
  export const createNote = async (req, res) => {
    const { student, cours, value } = req.body;
    console.log(req.body)
    try {
      const note = new Note({ student, cours, value });
      await note.save();
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la note.' });
    }
  };
  
  // Récupérer une note par son ID
  export const getNoteById = async (req, res) => {
    const { id: _id } = req.params;
  
    try {
      const note = await Note.findById(_id);
      if (!note) {
        return res.status(404).json({ error: 'Note non trouvée.' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la note.' });
    }
  };
  
  // Mettre à jour une note
  export const updateNote = async (req, res) => {
    const { id: _id } = req.params;
    const { student, cours, value } = req.body;
  
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        _id,
        { student, cours, value },
        { new: true }
      );
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note non trouvée.' });
      }
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la note.' });
    }
  };
  
  // Supprimer une note
  export const deleteNote = async (req, res) => {
    const { id: _id } = req.params;
  
    try {
      const deletedNote = await Note.findByIdAndRemove(_id);
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note non trouvée.' });
      }
      res.json({ message: 'Note supprimée avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la note.' });
    }
  };