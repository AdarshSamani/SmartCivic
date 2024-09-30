import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import ComplaintForm from './components/ComplaintForm'
import MyComplains from './components/MyComplains'
import MoreDetails from './components/MoreDetails'
import SolvedComplaintDetails from './components/SolvedComplaintDetails'
import AdminDashboard from './components/AdminDashboard'
import AdminComplains from './components/AdminComplains'
import AdminInProgress from './components/AdminInProgress'
import AdminAcceptComplain from './components/AdminAcceptComplain'
import AdminSolvedComplain from './components/AdminSolvedComplain'

function App() {

  return (
    <>
      <div className="App">
        {/* USER SIDE */}
      {/* <LoginForm /> */}
      {/* <Dashboard /> */}
      {/* <ComplaintForm /> */}
      {/* <MyComplains /> */}
      {/* <MoreDetails /> */}
      {/* <SolvedComplaintDetails /> */}

      {/* ADMIN SIDE */}
      {/* <AdminDashboard /> */}
      {/* <AdminComplains /> */}
      {/* <AdminInProgress /> */}
      {/* <AdminAcceptComplain /> */}
      {/* <AdminSolvedComplain /> */}
    </div>
    </>
  )
}

export default App
