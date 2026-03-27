import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SkillDetails from './pages/SkillDetails';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './pages/Profile';
import CreateSkill from './pages/CreateSkill';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="bottom-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/skills/new"
          element={
            <PrivateRoute>
              <CreateSkill />
            </PrivateRoute>
          }
        />
        <Route path="/skills/:id" element={<SkillDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
