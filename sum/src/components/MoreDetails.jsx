import React, { useState, useEffect } from 'react';
import './MoreDetails.css';
import person from '../assets/person.jpg'

const MoreDetails = () => {
    const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [complaintDetails, setComplaintDetails] = useState({
    service: 'ELECTRICAL',
    buildingName: '',
    wing: '',
    roomNo: '',
    complain: '',
    status: 'IN PROGRESS',
    contact: '9892345611'
  });

  useEffect(() => {
    // Fetch complaint details from API
    // This is a placeholder. In a real app, you'd make an API call here.
    // setComplaintDetails(fetchedData);
  }, []);

  const handleCancel = () => {
    // Handle cancel action
  };

  const handleReminder = () => {
    // Handle reminder action
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
          <button className="nav-button">LOGOUT</button>
        </nav>
      </aside>
      <main className="main-content">
        <h1>MORE DETAILS</h1>
        <div className="complaint-form">
          <div className="form-header">
            <h2>SERVICE : {complaintDetails.service}</h2>
          </div>
          <div className="form-fields">
            <input type="text" placeholder="BUILDING NAME" value={complaintDetails.buildingName} readOnly />
            <input type="text" placeholder="WING" value={complaintDetails.wing} readOnly />
            <input type="text" placeholder="ROOM NO./OTHERS" value={complaintDetails.roomNo} readOnly />
          </div>
          <textarea placeholder="COMPLAIN :" value={complaintDetails.complain} readOnly />
          <div className="form-actions">
            <button className="cancel-btn" onClick={handleCancel}>CANCEL</button>
            <div className="status-group">
              <span className="status">STATUS : <span className="status-value">{complaintDetails.status}</span></span>
              <button className="reminder-btn" onClick={handleReminder}>REMINDER</button>
            </div>
          </div>
          <div className="contact-info">
            CONTACT : {complaintDetails.contact}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoreDetails;