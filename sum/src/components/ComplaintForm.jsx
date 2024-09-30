import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css';
import person from '../assets/person.jpg'

const ComplaintForm = () => {
    const [user, setUser] = useState({ name: 'Olivia Cole', avatar: person });
  const [formData, setFormData] = useState({
    buildingName: '',
    wing: '',
    roomNo: '',
    description: '',
    phoneNo: '',
    highSeverity: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/complaints', {
        ...formData,
        service,
        userId: user.id
      });
      console.log('Complaint submitted:', response.data);
      // Reset form or redirect user
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
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
        <div className="card">
          <h1>FILE COMPLAIN</h1>
          <div className="service-info">SERVICE : ELECTRICAL</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="buildingName">BUILDING NAME</label>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                value={formData.buildingName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="wing">WING</label>
              <input
                type="text"
                id="wing"
                name="wing"
                value={formData.wing}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="roomNo">ROOM NO./OTHERS</label>
              <input
                type="text"
                id="roomNo"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">DESCRIBE YOUR COMPLAIN :</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">PHONE NO.</label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="severity-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="highSeverity"
                  checked={formData.highSeverity}
                  onChange={handleChange}
                />
                INCASE OF HIGH SEVERITY
              </label>
            </div>
            <button type="submit" className="submit-btn">SUBMIT</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ComplaintForm;