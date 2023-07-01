import React, { useEffect, useState } from 'react';
import { getAllCours, createCours, updateCours, deleteCours } from '../utils/api';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const [newCourseName, setNewCourseName] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);
    const [updatedCourseName, setUpdatedCourseName] = useState('');
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const response = await getAllCours();
        setCourses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours : ', error);
      }
    };
  
    const handleAddCourse = async () => {
      try {
        const response = await createCours({ name: newCourseName });
        setCourses([...courses, response.data]);
        setNewCourseName('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du cours : ', error);
      }
    };
  
    const handleUpdateCourse = async (id) => {
      try {
        await updateCours(id, { name: updatedCourseName });
        const updatedCourses = courses.map((course) => {
          if (course._id === id) {
            return { ...course, name: updatedCourseName };
          }
          return course;
        });
        setCourses(updatedCourses);
        setEditingCourse(null);
        setUpdatedCourseName('');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du cours : ', error);
      }
    };
  
    const handleDeleteCourse = async (id) => {
      try {
        await deleteCours(id);
        const updatedCourses = courses.filter((course) => course._id !== id);
        setCourses(updatedCourses);
      } catch (error) {
        console.error('Erreur lors de la suppression du cours : ', error);
      }
    };
  
    const handleEditCourse = (course) => {
      setEditingCourse(course._id);
      setUpdatedCourseName(course.name);
    };
  
    const handleCancelEdit = () => {
      setEditingCourse(null);
      setUpdatedCourseName('');
    };
  
    return (
      <div className='container'>
        <h2>Liste des cours</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {editingCourse === course._id ? (
                <div>
                  <input
                    type="text"
                    value={updatedCourseName}
                    onChange={(e) => setUpdatedCourseName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateCourse(course._id)}>Enregistrer</button>
                  <button className="cancel-button" onClick={handleCancelEdit}>Annuler</button>
                </div>
              ) : (
                <div>
                  <strong>{course.name}</strong> <br/>
                  <button onClick={() => handleEditCourse(course)}>Modifier</button>
                  <button className="delete-button" onClick={() => handleDeleteCourse(course._id)}>Supprimer</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <h2>Ajouter un cours</h2>
        <div className='form'>
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
        />
        <button onClick={handleAddCourse}>Ajouter</button>
        </div>
      </div>
    );
  };
  
  export default CoursesList;