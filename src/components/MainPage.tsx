import React, { useState } from 'react';
import './MainPage.css';

import Silhouette  from './Silhouette';
import PatientInfo from './PatientInfo';
import PatientList from './PatientList';

const animals = ['Dog', 'Cat', 'Horse', 'Rabbit'];

const MainPage: React.FC = () => {
  /* ------------------------------------------------------------ */
  const [selectedAnimal,   setSelectedAnimal]   = useState('Dog');
  const [selectedPatient,  setSelectedPatient]  = useState('');  // 👈 clicked patient ID
  const [refreshTrigger,   setRefreshTrigger]   = useState(0);

  /* called after PatientInfo adds a new patient */
  const handlePatientSaved = () => setRefreshTrigger(t => t + 1);

  return (
    <div className="main-layout">
      {/* --------- choose species --------- */}
      <div className="animal-button-row">
        {animals.map(animal => (
          <button
            key={animal}
            className={`animal-button ${selectedAnimal === animal ? 'active' : ''}`}
            onClick={() => setSelectedAnimal(animal)}
          >
            {animal}
          </button>
        ))}
      </div>

      {/* --------- silhouette + sidebar --------- */}
      <div className="silhouette-row">
        <Silhouette
          selectedAnimal={selectedAnimal}
          patientId={selectedPatient}        /* 👈 pass the chosen patient */
          onSaved={() => console.log('X-ray saved!')}
        />

        <div className="patient-side">
          <PatientInfo onSave={handlePatientSaved} />

          <PatientList
            refreshTrigger={refreshTrigger}
            onSelect={id => setSelectedPatient(id)}   /* 👈 update parent state */
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
