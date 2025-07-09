import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Layout from './components/Layout';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';

const StaffRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isStaff = localStorage.getItem('isStaff') === 'true';
  return isStaff ? <>{children}</> : <Navigate to="/main" replace />;
};

function App() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <Login />
        } 
      />

      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
 
      <Route
        path="/admin-panel"
        element={
          <StaffRoute>
            <Layout>
              <AdminPanel />
            </Layout>
          </StaffRoute>
        }
      />

      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Layout>
              <MainPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Redirect root to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
