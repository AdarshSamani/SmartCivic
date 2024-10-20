import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PendingTable() {
  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState({});

  useEffect(() => {
    fetchComplaints();
    fetchWorkers();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/complaints/status/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching pending complaints:', error);
    }
  };

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/workers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!selectedWorkers[id]) {
      alert('Please select a worker before moving the complaint to In Progress');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/complaints/${id}`, 
        { status: newStatus, worker: selectedWorkers[id] },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const handleWorkerSelect = (complaintId, workerId) => {
    setSelectedWorkers(prev => ({ ...prev, [complaintId]: workerId }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pending Complaints</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Utility</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Wing</th>
              <th className="py-3 px-6 text-left">Room No.</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Assign Worker</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{complaint.utility}</td>
                <td className="py-3 px-6 text-left">
                  {complaint.imageUrl && (
                    <a 
                      href={`http://localhost:5000${complaint.imageUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Image
                    </a>
                  )}
                </td>
                <td className="py-3 px-6 text-left">{complaint.wing}</td>
                <td className="py-3 px-6 text-left">{complaint.roomNo}</td>
                <td className="py-3 px-6 text-left">{complaint.description}</td>
                <td className="py-3 px-6 text-left">{complaint.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{new Date(complaint.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                  <select 
                    className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={selectedWorkers[complaint._id] || ''}
                    onChange={(e) => handleWorkerSelect(complaint._id, e.target.value)}
                  >
                    <option value="">Select Worker</option>
                    {workers.map((worker) => (
                      <option key={worker._id} value={worker._id}>{worker.email}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-6 text-left">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleStatusChange(complaint._id, 'in_progress')}
                  >
                    Move to In Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingTable;