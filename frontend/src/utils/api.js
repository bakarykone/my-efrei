import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getAllStudents = () => axios.get(`${API_BASE_URL}/students`);
export const getStudentById = (id) => axios.get(`${API_BASE_URL}/students/${id}`);
export const createStudent = (student) => axios.post(`${API_BASE_URL}/students`, student);
export const updateStudent = (id, student) => axios.put(`${API_BASE_URL}/students/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_BASE_URL}/students/${id}`);

export const getAllClasses = () => axios.get(`${API_BASE_URL}/classes`);
export const getClasseById = (id) => axios.get(`${API_BASE_URL}/classes/${id}`);
export const createClasse = (classe) => axios.post(`${API_BASE_URL}/classes`, classe);
export const updateClasse = (id, classe) => axios.put(`${API_BASE_URL}/classes/${id}`, classe);
export const deleteClasse = (id) => axios.delete(`${API_BASE_URL}/classes/${id}`);

export const getAllNotes = () => axios.get(`${API_BASE_URL}/notes`);
export const getNoteById = (id) => axios.get(`${API_BASE_URL}/notes/${id}`);
export const createNote = (note) => axios.post(`${API_BASE_URL}/notes`, note);
export const updateNote = (id, note) => axios.put(`${API_BASE_URL}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API_BASE_URL}/notes/${id}`);

export const getAllCours = () => axios.get(`${API_BASE_URL}/cours`);
export const getCoursById = (id) => axios.get(`${API_BASE_URL}/cours/${id}`);
export const createCours = (cour) => axios.post(`${API_BASE_URL}/cours`, cour);
export const updateCours = (id, cour) => axios.put(`${API_BASE_URL}/cours/${id}`, cour);
export const deleteCours = (id) => axios.delete(`${API_BASE_URL}/cours/${id}`);