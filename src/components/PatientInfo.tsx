import React, { useState } from 'react';
import './PatientInfo.css';

interface PatientInfoProps {
  onSave?: () => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    patient_id: '',
    chip_no: '',
    name: '',
    owner: '',
    owner_phone: '',
    date_of_birth: '',
    sex: '',
    species: '',
    breed: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const AK: string = localStorage.getItem("APIKey") ?? "";
  console.log("API Key: " + AK);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/patient/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Cookie": AK
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (response.status === 401) {
      alert("Your session has expired or you're not logged in. Please log in again.");
      window.location.href = "/login"; // redirect to login screen
      return;
    }

    const data = await response.json();

    if (response.ok) {
      alert('Patient saved successfully');
      setFormData({
        patient_id: '',
        chip_no: '',
        name: '',
        owner: '',
        owner_phone: '',
        date_of_birth: '',
        sex: '',
        species: '',
        breed: '',
      });
      if (onSave) onSave();
    } else {
      alert(data.error || 'Failed to save patient');
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('Server error while saving patient');
  }
};


  return (
    <div className="patient-id-display">
      <div className="patient-top-section">
        <h2>Patient Info</h2>

        <form onSubmit={handleSubmit} className="patient-info-section">
          <div className="info-block">
            <label htmlFor="patient_id">Patient ID</label>
            <input
              type="text"
              id="patient_id"
              name="patient_id"
              required
              value={formData.patient_id}
              onChange={handleChange}
            />
          </div>

          <div className="info-block">
            <label htmlFor="chip_no">Chip Number</label>
            <input
              type="text"
              id="chip_no"
              name="chip_no"
              required
              value={formData.chip_no}
              onChange={handleChange}
            />
          </div>

          <div className="info-block">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="info-block">
            <label htmlFor="owner">Owner</label>
            <input
              type="text"
              id="owner"
              name="owner"
              required
              value={formData.owner}
              onChange={handleChange}
            />
          </div>

          <div className="info-block">
            <label htmlFor="owner_phone">Owner Phone</label>
            <input
              type="text"
              id="owner_phone"
              name="owner_phone"
              required
              value={formData.owner_phone}
              onChange={handleChange}
            />
          </div>

          <div className="info-block">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              required
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>

          <div className="info-block">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              name="sex"
              required
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="info-block">
            <label htmlFor="species">Species</label>
            <select
              id="species"
              name="species"
              required
              value={formData.species}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="horse">Horse</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </div>

          <div className="info-block">
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              id="breed"
              name="breed"
              required
              value={formData.breed}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-patient-button">Save Patient</button>
        </form>
      </div>
    </div>
  );
};

export default PatientInfo;
