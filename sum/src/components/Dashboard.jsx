import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import person from '../assets/person.jpg'

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [stats, setStats] = useState({ complains: 0, inProgress: 0, solved: 0 });
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Fetch user data and stats from backend
    // const fetchData = async () => {
    //   try {
    //     const userResponse = await axios.get('/api/user');
    //     setUser(userResponse.data);
    //     const statsResponse = await axios.get('/api/stats');
    //     setStats(statsResponse.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // fetchData();
  }, []);

  const services = [
    'AIR-CONDITONER', 'PEST-CONTROL', 'FIRE-SYSTEM',
    'ELECTRICAL', 'TELEPHONE', 'PLUMBING',
    'DRINKING-WATER', 'NETWORK', 'EMERGENCY'
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    // Here you would typically navigate to a service-specific page or open a modal
    console.log(`Selected service: ${service}`);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">LUS</div>
        <div className="user-profile">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <p>{user.name}</p>
        </div>
        <nav>
          <button className="nav-button">DASHBOARD</button>
          <button className="nav-button">MY COMPLAINS</button>
          <button className="nav-button">LOGOUT</button>
        </nav>
      </aside>
      <main className="main-content">
        <h1>DASHBOARD</h1>
        <div className="stats-container">
          <div className="stat-box">
            <h3>COMPLAINS</h3>
            <p>{stats.complains}</p>
            <span className="indicator red"></span>
          </div>
          <div className="stat-box">
            <h3>IN PROGRESS</h3>
            <p>{stats.inProgress}</p>
            <span className="indicator yellow"></span>
          </div>
          <div className="stat-box">
            <h3>SOLVED</h3>
            <p>{stats.solved}</p>
            <span className="indicator green"></span>
          </div>
        </div>
        <h2>Select Area Of Service</h2>
        <div className="services-grid">
          {services.map((service) => (
            <button
              key={service}
              className={`service-button ${service === 'EMERGENCY' ? 'emergency' : ''}`}
              onClick={() => handleServiceSelect(service)}
            >
              {service}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;