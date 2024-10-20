import React from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintTable from './pages/ComplaintTable';
import PendingTable from './pages/PendingTable';
import InProgressTable from './pages/InProgressTable';
import SolvedTable from './pages/SolvedTable';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import WorkerComplaintTable from './pages/WorkerComplaintTable';
import WorkerSolvedTable from './pages/WorkerSolvedTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute role="user" />}>
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/complaint-form" element={<ComplaintForm />} />
                  <Route path="/complaint-table" element={<ComplaintTable />} />
                </Route>
                <Route element={<PrivateRoute role="admin" />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/pending-table" element={<PendingTable />} />
                  <Route path="/in-progress-table" element={<InProgressTable />} />
                  <Route path="/solved-table" element={<SolvedTable />} />
                </Route>
                <Route element={<PrivateRoute role="worker" />}>
                  <Route path="/worker-complaint-table" element={<WorkerComplaintTable />} />
                  <Route path="/worker-solved-table" element={<WorkerSolvedTable />} />
                </Route>
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;