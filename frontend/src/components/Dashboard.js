import React from 'react';
import '../css/DashboardStyles.css'; // Importez le fichier CSS

import dashboard from "../images/dashboard.jpg"

const Dashboard = () => {
  return (
    <div className="container">
    <div className="dashboard">
      <img src={dashboard} alt="Image du Dashboard" />
      <h2>Bienvenue sur myEfrei</h2>
      <p>myEfrei est la plateforme qui centralise l'ensemble de vos services de l'Efrei.
Le site a bénéficié d'une refonte en s'appuyant sur les technos web les plus récentes, dans le but de toujours répondre au mieux à vos attentes.</p>
    </div>
    </div>
  );
};

export default Dashboard;