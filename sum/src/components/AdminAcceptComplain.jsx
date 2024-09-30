import React, { useState, useEffect } from 'react';
import './AdminAcceptComplain.css';
import person from '../assets/person.jpg'

const AdminAcceptComplain = () => {
    const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [complaintDetails, setComplaintDetails] = useState({
    service: 'ELECTRICAL',
    buildingName: '',
    wing: '',
    roomNo: '',
    complain: '',
    status: '',
    contact: '9892345611'
  });

  useEffect(() => {
    // Fetch complaint details from API
    // This is a placeholder. In a real app, you'd make an API call here.
    // setComplaintDetails(fetchedData);
  }, []);

//   const handleCancel = () => {
//     // Handle cancel action
//   };

  const handleInProgress = () => {
    // Handle In progress action
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
        <h1>COMPLAIN</h1>
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
            {/* <button className="cancel-btn" onClick={handleCancel}>CANCEL</button> */}
            <div className="status-group">
              <button className="reminder-btn" onClick={handleInProgress}>IN PROGRESS</button>
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

export default AdminAcceptComplain;