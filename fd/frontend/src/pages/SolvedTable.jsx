import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SolvedTable() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/complaints/status/solved', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Solved Complaints</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-green-100 text-green-800 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Utility</th>
              <th className="py-3 px-6 text-left">Wing</th>
              <th className="py-3 px-6 text-left">Room No.</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Assigned Worker</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Solved At</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-6 text-left whitespace-nowrap">{complaint.utility}</td>
                <td className="py-3 px-6 text-left">{complaint.wing}</td>
                <td className="py-3 px-6 text-left">{complaint.roomNo}</td>
                <td className="py-3 px-6 text-left">
                  <div className="max-w-xs overflow-hidden overflow-ellipsis">{complaint.description}</div>
                </td>
                <td className="py-3 px-6 text-left">{complaint.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{complaint.worker.email}</td>
                <td className="py-3 px-6 text-left">{new Date(complaint.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">{new Date(complaint.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SolvedTable;