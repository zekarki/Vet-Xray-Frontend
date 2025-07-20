import React, { useEffect, useState } from "react";
import { api } from "../api";
import Silhouette from "./Silhouette";

type Patient = {
  patient_id: string;
  name: string;
  species: string;
};

const ScanPanel: React.FC = () => {
  const [patients, setPatients]       = useState<Patient[]>([]);
  const [chosen, setChosen]           = useState<Patient | null>(null);

  useEffect(() => {
   api.get("/patient/")
   .then((res: { data: { patients: Patient[] } }) => setPatients(res.data.patients))
   .catch(console.error);

  }, []);

  return (
    <div className="scan-panel">
      <h2>Select Patient</h2>
      <select
        value={chosen?.patient_id ?? ""}
        onChange={e => {
          const p = patients.find(p => p.patient_id === e.target.value);
          setChosen(p ?? null);
        }}
      >
        <option value="">-- choose --</option>
        {patients.map(p => (
          <option key={p.patient_id} value={p.patient_id}>
            {p.patient_id} | {p.name} ({p.species})
          </option>
        ))}
      </select>

      {chosen && (
        <Silhouette
          patientId={chosen.patient_id}
          selectedAnimal={chosen.species}
        />
      )}
    </div>
  );
};

export default ScanPanel;
