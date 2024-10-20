import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function UserDashboard() {
  const [stats, setStats] = useState({ pending: 0, in_progress: 0, solved: 0 });
  const [utilities, setUtilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const statsResponse = await axios.get('http://localhost:5000/api/complaints/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsResponse.data);

        const utilitiesResponse = await axios.get('http://localhost:5000/api/utilities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUtilities(utilitiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Pending', value: stats.pending },
    { name: 'In Progress', value: stats.in_progress },
    { name: 'Solved', value: stats.solved },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">User Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-12">
        <div className="bg-white rounded-lg shadow-lg p-6 h-80">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Complaint Statistics</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">File a Complaint</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility) => (
              <Link
                key={utility._id}
                to={`/complaint-form?utility=${utility.name}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl text-center text-2xl flex items-center justify-center"
              >
                {utility.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}