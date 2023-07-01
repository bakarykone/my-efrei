import React, { useEffect, useState } from "react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../utils/api";

import "../css/StudentsListStyles.css"

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedStudentName, setUpdatedStudentName] = useState("");
  const [updatedStudentAge, setUpdatedStudentAge] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      console.log(response.data)
      setStudents(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants : ", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await createStudent({
        name: newStudent,
        age: newStudentAge,
      });
      setStudents([...students, response.data]);
      setNewStudent("");
      setNewStudentAge("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant : ", error);
    }
  };

  const handleUpdateStudent = async (id) => {
    try {
      await updateStudent(id, {
        name: updatedStudentName,
        age: updatedStudentAge,
      });
      const updatedStudents = students.map((student) => {
        if (student._id === id) {
          return {
            ...student,
            name: updatedStudentName,
            age: updatedStudentAge,
          };
        }
        return student;
      });
      setStudents(updatedStudents);
      setEditingStudent(null);
      setUpdatedStudentName("");
      setUpdatedStudentAge("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'étudiant : ", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant : ", error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student._id);
    setUpdatedStudentName(student.name);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setUpdatedStudentName("");
  };

  return (
    <div className="container">
      <h2>Liste des étudiants</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {editingStudent === student._id ? (
              <div>
                <input
                  type="text"
                  value={updatedStudentName}
                  onChange={(e) => setUpdatedStudentName(e.target.value)}
                />
                <input
                  type="text"
                  value={updatedStudentAge}
                  onChange={(e) => setUpdatedStudentAge(e.target.value)}
                  placeholder="Âge"
                />
                <button onClick={() => handleUpdateStudent(student._id)}>
                  Enregistrer
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>Annuler</button>
              </div>
            ) : (
              <div>
                Nom : {student?.name} <br/>
                Age : {student?.age} <br/>
                Classe : {student?.classe?.name || "Aucune classe pour le moment"} <br/>
                <button onClick={() => handleEditStudent(student)}>
                  Modifier
                </button>
                <button className="delete-button" onClick={() => handleDeleteStudent(student._id)}>
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>Ajouter un nouvel étudiant</h2>
      <div className="form">
      <input
        type="text"
        value={newStudent}
        onChange={(e) => setNewStudent(e.target.value)}
      />
      <input
        type="text"
        value={newStudentAge}
        onChange={(e) => setNewStudentAge(e.target.value)}
        placeholder="Âge"
      />
      <button onClick={handleAddStudent}>Ajouter</button>
      </div>
    </div>
  );
};

export default StudentsList;
