import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Required for session
      body: JSON.stringify({
        student_id: studentId,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Set localStorage
      localStorage.setItem("firstName", data.first_name);
      localStorage.setItem("isStaff", data.is_staff ? "true" : "false");
      localStorage.setItem("loggedIn", "true");
      // localStorage.setItem("APIKey", data.api_key);

      // Delay navigation to ensure session is set
      // setTimeout(() => navigate('/main'), 100); // ← no reload
      navigate('/main'); // ← no reload
    } else {
      setErrorMsg(data.error || 'Login failed');
    }
  } catch (error) {
    console.error(error);
    setErrorMsg('Login failed. Server error.');
  }
};


  return (
    <Layout>
      <div className="login-container">
        <div className="login-box">
          <div className="login-tabs">
            <div
              className={`tab ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              Student
            </div>
            <div
              className={`tab ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveTab('teacher')}
            >
              Teacher
            </div>
          </div>

          <div className="login-form">
            {activeTab === 'student' ? (
              <>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} className="login-button">Login</button>

                <p className="register-prompt">Don't have an account?</p>
                <button onClick={() => navigate('/register')} className="register-button">
                  Register
                </button>


                {errorMsg && <p className="error-msg">{errorMsg}</p>}
              </>
            ) : (
              <>
                <input type="text" placeholder="Student ID" disabled />
                <input type="password" placeholder="Password" disabled />
                <button className="login-button" disabled>Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
