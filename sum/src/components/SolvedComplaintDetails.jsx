import React, { useState, useEffect } from 'react';
import './SolvedComplaintDetails.css';
import person from '../assets/person.jpg'

const SolvedComplaintDetails = () => {
    const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [complaintDetails, setComplaintDetails] = useState({
    service: 'ELECTRICAL',
    buildingName: '',
    wing: '',
    roomNo: '',
    complain: '',
    status: 'SOLVED'
  });
  const [feedback, setFeedback] = useState('');
  const [isSatisfactory, setIsSatisfactory] = useState(null);

  useEffect(() => {
    // Fetch complaint details from API
    // This is a placeholder. In a real app, you'd make an API call here.
    // setComplaintDetails(fetchedData);
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    // Submit feedback to API
    console.log('Feedback submitted:', { isSatisfactory, feedback });
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
          <div className="status">STATUS : <span className="status-solved">{complaintDetails.status}</span></div>
          <div className="feedback-section">
            <p>PLEASE CHECK AND LET US KNOW IF THE WORK IS SATISFACTORY?</p>
            <div className="satisfaction-buttons">
              <button 
                className={isSatisfactory === true ? 'active' : ''} 
                onClick={() => setIsSatisfactory(true)}
              >
                YES
              </button>
              <button 
                className={isSatisfactory === false ? 'active' : ''} 
                onClick={() => setIsSatisfactory(false)}
              >
                NO, COMPLAIN AGAIN
              </button>
            </div>
            {/* <textarea 
              placeholder="FEEDBACK :" 
              value={feedback} 
              onChange={handleFeedbackChange}
            /> */}
            <button className="submit-btn" onClick={handleSubmit}>SUBMIT</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolvedComplaintDetails;