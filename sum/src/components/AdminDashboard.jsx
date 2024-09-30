import React, { useState } from 'react';
import './AdminDashboard.css';
import person from '../assets/person.jpg'

const AdminDashboard = () => {
    const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [stats, setStats] = useState({ complains: 0, inProgress: 0, solved: 0 });



  const services = [
    'AIR-CONDITIONER', 'PEST-CONTROL', 'FIRE-SYSTEM',
    'ELECTRICAL', 'TELEPHONE', 'PLUMBING',
    'DRINKING-WATER', 'EMERGENCY'
  ];

//   const navItems = ['DASHBOARD', 'COMPLAINS', 'IN PROGRESS', 'SOLVED', 'LOGOUT'];

  const handleAddService = () => {
    console.log('Adding new service:', newServiceName);
    setNewServiceName('');
    setShowAddService(false);
  };

  return (
    <div className="complaint-container">
      <aside className="sidebar">
        <div className="logo">LUS</div>
        <div className="user-profile">
          <img src={user.avatar} alt={user.name} className="avatar" />
          <p>{user.name}</p>
        </div>
        <nav>
          <button className="nav-button">DASHBOARD</button>
          <button className="nav-button">MY COMPLAINS</button>
          <button className="nav-button">In PROGRESS</button>
          <button className="nav-button">SOLVED</button>
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
        <h2>Add Area Of Service</h2>

        <div className="services-grid">
          {services.map((service) => (
            <button
              key={service}
              className={`service-button ${service === 'EMERGENCY' ? 'emergency' : ''}`}
            >
              {service}
            </button>
          ))}
          <button
            onClick={() => setShowAddService(true)}
            className="service-button add-service"
          >
            +
          </button>
        </div>

        {showAddService && (
          <div className="add-service-form">
            <h3>ADD AREA OF SERVICE:</h3>
            <div className="form-input">
              <input
                type="text"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                placeholder="NAME"
              />
              <button onClick={handleAddService}>ADD</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;