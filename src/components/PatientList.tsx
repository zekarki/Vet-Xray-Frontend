import React, { useEffect, useState } from 'react';
import './PatientList.css';

interface Patient {
  patient_id: string;
  name: string;
  owner: string;
  date_of_birth: string;
  sex: string;
  breed: string;
  species: string;
  owner_phone: string;
  chip_no: string;
}

interface Props {
  refreshTrigger: number;
  onSelect?: (patientId: string) => void;
}

const PatientList: React.FC<Props> = ({ refreshTrigger, onSelect }) => {
  const [patients,   setPatients]   = useState<Patient[]>([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('http://localhost:8000/patient/', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.patients) setPatients(data.patients);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    })();
  }, [refreshTrigger]);

  const handleClick = (id: string) => {
    setSelectedId(id);
    onSelect?.(id);
  };

  return (
    <div className="patient-list-container">
      <h3>Saved Patients</h3>
      <div className="patient-list-scroll">
        {patients.length === 0 ? (
          <p style={{ color: '#b3e21a' }}>No patients found.</p>
        ) : (
          patients.map(p => (
            <div
              key={p.patient_id}
              className={`patient-row ${p.patient_id === selectedId ? 'selected' : ''}`}
              onClick={() => handleClick(p.patient_id)}
            >
              <p><strong>{p.name}</strong> (ID: {p.patient_id})</p>
              <p>Sex: {p.sex} &nbsp;|&nbsp; Breed: {p.breed}</p>
              <p>Chip No: {p.chip_no || 'N/A'}</p>
              <p>DOB: {p.date_of_birth} &nbsp;|&nbsp; Species: {p.species}</p>
              <p>Owner: {p.owner} &nbsp;|&nbsp; Phone: {p.owner_phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientList;
