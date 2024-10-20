import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Complaints</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Utility</th>
              <th className="py-3 px-6 text-left">Wing</th>
              <th className="py-3 px-6 text-left">Room No.</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Created At</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{complaint.utility}</td>
                <td className="py-3 px-6 text-left">{complaint.wing}</td>
                <td className="py-3 px-6 text-left">{complaint.roomNo}</td>
                <td className="py-3 px-6 text-left">{complaint.description}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    complaint.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    complaint.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{new Date(complaint.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintTable;