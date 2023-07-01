import React, { useEffect, useState } from "react";
import {
  getAllClasses,
  createClasse,
  updateClasse,
  deleteClasse,
  getAllStudents,
} from "../utils/api";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [editingClass, setEditingClass] = useState(null);
  const [updatedClassName, setUpdatedClassName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await getAllClasses();
      setClasses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des classes : ", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des élèves : ", error);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await createClasse({
        name: newClassName,
        students: selectedStudents,
      });
      setClasses([...classes, response.data]);
      setNewClassName("");
      setSelectedStudents([]); // Réinitialiser la sélection d'élèves
    } catch (error) {
      console.error("Erreur lors de l'ajout de la classe : ", error);
    }
  };

  const handleUpdateClass = async (id) => {
    try {
      await updateClasse(id, {
        name: updatedClassName,
        students: selectedStudents,
      });
      const updatedClasses = classes.map((classe) => {
        if (classe._id === id) {
          return {
            ...classe,
            name: updatedClassName,
            students: selectedStudents,
          };
        }
        return classe;
      });
      setClasses(updatedClasses);
      setEditingClass(null);
      setUpdatedClassName("");
      setSelectedStudents([]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la classe : ", error);
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await deleteClasse(id);
      const updatedClasses = classes.filter((classe) => classe._id !== id);
      setClasses(updatedClasses);
    } catch (error) {
      console.error("Erreur lors de la suppression de la classe : ", error);
    }
  };

  const handleEditClass = (classe) => {
    setEditingClass(classe._id);
    setUpdatedClassName(classe.name);
    setSelectedStudents(classe.students);
  };

  const handleAddStudentToClass = (studentId) => {
    setSelectedStudents([...selectedStudents, studentId]);
  };

  const handleRemoveStudentFromClass = (studentId) => {
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
  };

  return (
    <div className="container">
      <h2>Liste des classes</h2>
      <ul>
        {classes.map((classe) => (
          <li key={classe._id}>
            {editingClass === classe._id ? (
              <div className="edit-class-container">
                <input
                  type="text"
                  value={updatedClassName}
                  onChange={(e) => setUpdatedClassName(e.target.value)}
                />
                <select
                  multiple
                  value={selectedStudents}
                  onChange={(e) =>
                    setSelectedStudents(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                <div className="students-in-class-container">
                  <h3>Élèves dans la classe :</h3>
                  <ul>
                    {classe.students.map((student) => (
                      <li key={student._id}>
                        {student.name}{" "}
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleRemoveStudentFromClass(student._id)
                          }
                        >
                          Supprimer de la classe
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="add-student-container">
                  <h3>Ajouter un élève à la classe :</h3>
                  <select
                    value="" // Modifier ici, car nous n'avons pas besoin de garder la valeur de selectedStudentsToAdd
                    onChange={(e) => handleAddStudentToClass(e.target.value)} // Modifier ici pour appeler directement handleAddStudentToClass
                  >
                    <option value="">Sélectionnez un élève à ajouter</option>
                    {students
                      .filter(
                        (student) => !selectedStudents.includes(student._id)
                      )
                      .map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={() => handleAddStudentToClass(selectedStudents)}
                  >
                    Ajouter à la classe
                  </button>
                </div>
                <button
                  className="cancel-button"
                  onClick={() => handleUpdateClass(classe._id)}
                >
                  Annuler
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClass(classe._id)}
                >
                  Supprimer
                </button>
              </div>
            ) : (
              <div>
                <strong>{classe.name}</strong>
                <ul>
                  {classe.students.map((student) => (
                    <li key={student._id}>{student.name}</li>
                  ))}
                </ul>
                <button onClick={() => handleEditClass(classe)}>
                  Modifier
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClass(classe._id)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Ajouter une classe</h2>
      <div className="form">
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <select
          multiple
          value={selectedStudents}
          onChange={(e) =>
            setSelectedStudents(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddClass}>Ajouter</button>
      </div>
    </div>
  );
};
export default ClassesList;
