import React from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentsList from './components/StudentsList';
import ClassesList from './components/ClassesList';
import CoursList from './components/CoursList';
import NotesList from './components/NotesList';



const App = () => {
  return (
     <Router>
       <div className="App">
       <Header/>
       <Navbar />
         <Routes>
           <Route path="/"  element={<Dashboard/>} />
           <Route path="/students"  element={<StudentsList/>} />
           <Route path="/classes"  element={<ClassesList/>} />
           <Route path="/cours"  element={<CoursList/>} />
           <Route path="/notes" element={<NotesList/>} /> 
         </Routes>
       </div>
     </Router>
  );
};

export default App;