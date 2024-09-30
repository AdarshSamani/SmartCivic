import React, { useState, useEffect } from 'react';
import './AdminInProgress.css';
import person from '../assets/person.jpg'

const AdminInProgress = () => {
    const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints data from API
    // This is a placeholder. In a real app, you'd make an API call here.
    setComplaints([
      { id: '1', serviceDetails: 'ELECTRICAL', dateTime: '2024-09-29 10:00', building: 'A', wing: '10', roomNo: '101', moreDetails: 'Details' },
      { id: '2', serviceDetails: 'PLUMBING', dateTime: '2024-09-28 14:30', building: 'B', wing: '15', roomNo: '103', moreDetails: 'Details' },
    ]);
  }, []);

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
        <h1>IN PROGRESS</h1>
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SERVICE DETAILS</th>
              <th>DATE&TIME</th>
              <th>BUILDING</th>
              <th>WING</th>
              <th>ROOM NO.</th>
              <th>MORE DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.serviceDetails}</td>
                <td>{complaint.dateTime}</td>
                <td>{complaint.building}</td>
                <td>{complaint.wing}</td>
                <td>{complaint.roomNo}</td>
                <td>{complaint.moreDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </main>
    </div>
  );
};

export default AdminInProgress;