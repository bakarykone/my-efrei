import React, { useEffect, useState } from "react";
import { getAllNotes, createNote, updateNote, deleteNote, getAllStudents, getAllCours } from "../utils/api";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteValue, setNewNoteValue] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [updatedNoteValue, setUpdatedNoteValue] = useState("");
  const [newNoteStudent, setNewNoteStudent] = useState("");
  const [newNoteCourse, setNewNoteCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [cours, setCourses] = useState([]);

  useEffect(() => {
    fetchNotes();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des notes : ", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants : ', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getAllCours();
      setCourses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours : ', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await createNote({
        student: newNoteStudent,
        cours: newNoteCourse,
        value: newNoteValue
      });
      setNotes([...notes, response.data]);
      setNewNoteValue('');
      setNewNoteStudent('');
      setNewNoteCourse('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note : ', error);
    }
  };

  const handleUpdateNote = async (id) => {
    try {
      await updateNote(id, { value: updatedNoteValue });
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, value: updatedNoteValue };
        }
        return note;
      });
      setNotes(updatedNotes);
      setEditingNote(null);
      setUpdatedNoteValue("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note : ", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Erreur lors de la suppression de la note : ", error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note._id);
    setUpdatedNoteValue(note.value);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setUpdatedNoteValue("");
  };

  return (
    <div className="container">
      <h2>Liste des notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {editingNote === note._id ? (
              <div>
                <input
                  type="number"
                  value={updatedNoteValue}
                  onChange={(e) => setUpdatedNoteValue(e.target.value)}
                />
                <button onClick={() => handleUpdateNote(note._id)}>
                  Enregistrer
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Annuler
                </button>
              </div>
            ) : (
              <div>
                <strong>Elève: {note.student?.name}</strong>
                <br />
                <strong>Cours: {note.cours?.name}</strong>
                <br />
                <strong>Note: {note?.value}</strong>
                <br />
                <button onClick={() => handleEditNote(note)}>Modifier</button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteNote(note._id)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Ajouter une note</h2>
      <div className='form-group'>
        <label>Élève:</label>
        <select value={newNoteStudent} onChange={(e) => setNewNoteStudent(e.target.value)}>
          <option value=''>Sélectionner un élève</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>{student.name}</option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label>Cours:</label>
        <select value={newNoteCourse} onChange={(e) => setNewNoteCourse(e.target.value)}>
          <option value=''>Sélectionner un cours</option>
          {cours.map((cour) => (
            <option key={cour._id} value={cour._id}>{cour.name}</option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label>Note:</label>
        <input type='number' value={newNoteValue} onChange={(e) => setNewNoteValue(e.target.value)} />
      </div>
      <button onClick={handleAddNote}>Ajouter</button>
    </div>
  );
};

export default NotesList;

