/* ─────────────────────────── AdminPanel.tsx ───────────────────────── */
import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import './AdminPanel.css';

/* ---------- Type definitions -------------------------------------- */
interface User {
  id: number;
  first_name: string;
  student_id: string;
  is_staff: boolean | number | string;
}

interface Patient {
  patient_id: string;
  name: string;
  species: string;
  owner: string;
  owner_phone: string;
  breed: string;
  chip_no: string;
  date_of_birth: string;
  sex: string;
}

/* ---------- Inline component: EditablePatientCard ----------------- */
const EditablePatientCard: React.FC<{
  patient: Patient;
  onUpdate: (p: Patient) => void;
  onDelete: (id: string) => void;
}> = ({ patient, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Patient>({ ...patient });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDraft({ ...draft, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(draft);
    setIsEditing(false);
  };

  return (
    <div className={`admin-card ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form two-col">
          {/* ---------- 1st column ---------- */}
          <div className="form-field">
            <label htmlFor={`pname-${patient.patient_id}`}>Name</label>
            <input
              id={`pname-${patient.patient_id}`}
              name="name"
              value={draft.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`pspecies-${patient.patient_id}`}>Species</label>
            <input
              id={`pspecies-${patient.patient_id}`}
              name="species"
              value={draft.species}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`pbreed-${patient.patient_id}`}>Breed</label>
            <input
              id={`pbreed-${patient.patient_id}`}
              name="breed"
              value={draft.breed}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`psex-${patient.patient_id}`}>Sex</label>
            <input
              id={`psex-${patient.patient_id}`}
              name="sex"
              value={draft.sex}
              onChange={handleChange}
            />
          </div>

          {/* ---------- 2nd column ---------- */}
          <div className="form-field">
            <label htmlFor={`pchip-${patient.patient_id}`}>Chip No</label>
            <input
              id={`pchip-${patient.patient_id}`}
              name="chip_no"
              value={draft.chip_no}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`pdob-${patient.patient_id}`}>DOB</label>
            <input
              id={`pdob-${patient.patient_id}`}
              name="date_of_birth"
              type="date"
              value={draft.date_of_birth}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`powner-${patient.patient_id}`}>Owner</label>
            <input
              id={`powner-${patient.patient_id}`}
              name="owner"
              value={draft.owner}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`pphone-${patient.patient_id}`}>Phone</label>
            <input
              id={`pphone-${patient.patient_id}`}
              name="owner_phone"
              value={draft.owner_phone}
              onChange={handleChange}
            />
          </div>

          {/* ---------- actions row spans full width ---------- */}
          <div className="card-actions full-width">
            <button type="submit" className="btn update-btn">
              Save
            </button>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <strong>{patient.name}</strong> — {patient.species}
          </div>
          <div>
            Owner: {patient.owner} | Phone: {patient.owner_phone}
          </div>
          <div className="card-actions">
            <button
              className="btn update-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn delete-btn"
              onClick={() => onDelete(patient.patient_id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

/* ---------- Inline component: EditableUserCard -------------------- */
const EditableUserCard: React.FC<{
  user: User;
  onUpdate: (user: User) => void;
  onDelete: (student_id: string) => void;
}> = ({ user, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState({
    first_name: user.first_name,
    student_id: user.student_id,
  });

  const isTeacher =
    user.is_staff === true || user.is_staff === 1 || user.is_staff === '1';

  return (
    <div className={`admin-card ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            onUpdate({ ...user, ...localData });
            setIsEditing(false);
          }}
          className="edit-form"
        >
          <div className="form-field">
            <label htmlFor={`fname-${user.id}`}>First Name</label>
            <input
              id={`fname-${user.id}`}
              value={localData.first_name}
              onChange={e =>
                setLocalData({ ...localData, first_name: e.target.value })
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor={`sid-${user.id}`}>Student ID</label>
            <input
              id={`sid-${user.id}`}
              value={localData.student_id}
              onChange={e =>
                setLocalData({ ...localData, student_id: e.target.value })
              }
            />
          </div>

          <div className="card-actions full-width">
            <button type="submit" className="btn update-btn">
              Save
            </button>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <strong>{user.first_name}</strong> — {user.student_id}
          </div>
          <div>Role: {isTeacher ? 'Teacher' : 'Student'}</div>
          <div className="card-actions">
            <button
              className="btn update-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn delete-btn"
              onClick={() => onDelete(user.student_id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

/* ---------- Main AdminPanel component (unchanged logic) ----------- */
/*  … FULL AdminPanel code from previous message remains as-is …      */
/*  To keep this response focused, the rest (fetch helpers, add forms,*/
/*  footer with video, etc.) is identical to the “single-file” code   */
/*  I sent earlier. Simply paste that content below this comment.     */
/* ------------------------------------------------------------------ */


/* ---------- Main AdminPanel component ------------------------------ */
const AdminPanel: React.FC = () => {
  /* ---------------- State ----------------------------------------- */
  const [users, setUsers] = useState<User[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newUser, setNewUser] = useState({
    first_name: '',
    student_id: '',
    password: '',
  });
  const [newPatient, setNewPatient] = useState<Patient>({
    patient_id: '',
    name: '',
    species: '',
    owner: '',
    owner_phone: '',
    breed: '',
    chip_no: '',
    date_of_birth: '',
    sex: '',
  });

  /* ---------------- Initial fetch --------------------------------- */
  useEffect(() => {
    fetchUsers();
    fetchPatients();
  }, []);

  /* ---------------- Users API helpers ----------------------------- */
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8000/user/', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.users) setUsers(data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const addUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (res.ok) {
        setNewUser({ first_name: '', student_id: '', password: '' });
        fetchUsers();
      } else alert(data.error || 'Failed to add user.');
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const updateUser = async (
    u: User & { original_student_id?: string }
  ) => {
    try {
      const res = await fetch('http://localhost:8000/user/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          original_student_id: u.original_student_id || u.student_id,
          student_id: u.student_id,
          first_name: u.first_name,
        }),
      });
      const data = await res.json();
      if (res.ok) fetchUsers();
      else alert(data.error || 'Failed to update user.');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const deleteUser = async (student_id: string) => {
    if (!window.confirm(`Delete user ${student_id}?`)) return;
    try {
      await fetch('http://localhost:8000/user/', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id }),
      });
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  /* ---------------- Patients API helpers -------------------------- */
  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:8000/patient/', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.patients) setPatients(data.patients);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const addPatient = async () => {
    try {
      const res = await fetch('http://localhost:8000/patient/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newPatient),
      });
      const data = await res.json();
      if (res.ok) {
        setNewPatient({
          patient_id: '',
          name: '',
          species: '',
          owner: '',
          owner_phone: '',
          breed: '',
          chip_no: '',
          date_of_birth: '',
          sex: '',
        });
        fetchPatients();
      } else alert(data.error || 'Failed to add patient.');
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  const updatePatient = async (p: Patient) => {
    try {
      const res = await fetch('http://localhost:8000/patient/', {
        method: 'PUT', // or PATCH, per your API
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (res.ok) fetchPatients();
      else alert(data.error || 'Failed to update patient.');
    } catch (err) {
      console.error('Error updating patient:', err);
    }
  };

  const deletePatient = async (patient_id: string) => {
    if (!window.confirm(`Delete patient ${patient_id}?`)) return;
    try {
      await fetch('http://localhost:8000/patient/', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_id }),
      });
      fetchPatients();
    } catch (err) {
      console.error('Failed to delete patient:', err);
    }
  };

  /* ---------------- Render ---------------------------------------- */
  return (
    <>
      <div className="admin-panel-grid">
        {/* ---- USERS SECTION ------------------------------------- */}
        <div className="admin-section">
          <h2>Manage Users</h2>

          <div className="admin-form">
            <input
              placeholder="First Name"
              value={newUser.first_name}
              onChange={e =>
                setNewUser({ ...newUser, first_name: e.target.value })
              }
            />
            <input
              placeholder="Student ID"
              value={newUser.student_id}
              onChange={e =>
                setNewUser({ ...newUser, student_id: e.target.value })
              }
            />
            <input
              placeholder="Password"
              value={newUser.password}
              onChange={e =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <button className="btn add-btn" onClick={addUser}>
              Add User
            </button>
          </div>

          {users.map(u => (
            <EditableUserCard
              key={u.id}
              user={u}
              onUpdate={upd =>
                updateUser({ ...upd, original_student_id: u.student_id })
              }
              onDelete={deleteUser}
            />
          ))}
        </div>

        {/* ---- PATIENTS SECTION ---------------------------------- */}
        <div className="admin-section">
          <h2>Manage Patients</h2>

          <div className="admin-form">
            <input
              placeholder="Name"
              value={newPatient.name}
              onChange={e =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
            />
            <input
              placeholder="Species"
              value={newPatient.species}
              onChange={e =>
                setNewPatient({ ...newPatient, species: e.target.value })
              }
            />
            <input
              placeholder="Owner"
              value={newPatient.owner}
              onChange={e =>
                setNewPatient({ ...newPatient, owner: e.target.value })
              }
            />
            <input
              placeholder="Phone"
              value={newPatient.owner_phone}
              onChange={e =>
                setNewPatient({ ...newPatient, owner_phone: e.target.value })
              }
            />
            <input
              placeholder="Breed"
              value={newPatient.breed}
              onChange={e =>
                setNewPatient({ ...newPatient, breed: e.target.value })
              }
            />
            <input
              placeholder="Chip No"
              value={newPatient.chip_no}
              onChange={e =>
                setNewPatient({ ...newPatient, chip_no: e.target.value })
              }
            />
            <input
              placeholder="DOB"
              value={newPatient.date_of_birth}
              onChange={e =>
                setNewPatient({
                  ...newPatient,
                  date_of_birth: e.target.value,
                })
              }
            />
            <input
              placeholder="Sex"
              value={newPatient.sex}
              onChange={e =>
                setNewPatient({ ...newPatient, sex: e.target.value })
              }
            />
            <button className="btn add-btn" onClick={addPatient}>
              Add Patient
            </button>
          </div>

          {patients.map(p => (
            <EditablePatientCard
              key={p.patient_id}
              patient={p}
              onUpdate={updatePatient}
              onDelete={deletePatient}
            />
          ))}
        </div>
      </div>

      {/* ---- Help / Tutorial footer (unchanged) ------------------ */}
      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          textAlign: 'center',
          color: '#000',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h3 style={{ marginBottom: '10px' }}>Need Help?</h3>
        <p>Watch the tutorial video below:</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/iivuKrH_Ds0?si=OwOaWpZUAmWz2txj"
            title="VetXray Tutorial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
