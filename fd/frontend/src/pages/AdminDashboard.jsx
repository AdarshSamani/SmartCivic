import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const Alert = ({ children }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
    <span className="block sm:inline">{children}</span>
  </div>
);

export default function AdminDashboard() {
  const [utilities, setUtilities] = useState([]);
  const [newUtility, setNewUtility] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUtilities();
  }, []);

  const fetchUtilities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/utilities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUtilities(response.data);
    } catch (error) {
      console.error('Error fetching utilities:', error);
      setError('Failed to fetch utilities. Please try again.');
    }
  };

  const handleAddUtility = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/utilities', { name: newUtility }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewUtility('');
      fetchUtilities();
    } catch (error) {
      console.error('Error adding utility:', error);
      setError('Failed to add utility. Please try again.');
    }
  };

  const handleDeleteUtility = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/utilities/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUtilities();
    } catch (error) {
      console.error('Error deleting utility:', error);
      setError('Failed to delete utility. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Admin Dashboard</h1>
      
      {error && <Alert>{error}</Alert>}
      
      <div className="grid grid-cols-1 gap-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">Existing Utilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility) => (
              <div
              key={utility._id}
              className="bg-blue-500 text-white font-bold py-6 px-4 rounded-lg shadow-md text-2xl flex items-center justify-center group hover:bg-blue-600 transition duration-300 relative overflow-hidden"
            >
              <span className="transition-all duration-300 group-hover:-translate-x-4">
                {utility.name}
              </span>
              <button
                onClick={() => handleDeleteUtility(utility._id)}
                className="absolute right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-full group-hover:translate-x-0"
                aria-label="Delete utility"
              >
                <TrashIcon />
              </button>
            </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">Add New Utility</h2>
          <div className="space-y-6">
            <input
              type="text"
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Utility Name"
              value={newUtility}
              onChange={(e) => setNewUtility(e.target.value)}
            />
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              onClick={handleAddUtility}
            >
              Add Utility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}