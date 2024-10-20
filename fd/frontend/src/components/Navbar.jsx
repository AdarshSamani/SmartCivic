import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-white text-3xl font-extrabold">Lodha Utility Service</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {role === 'user' && (
                <>
                  <Link to="/user-dashboard" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Dashboard</Link>
                  <Link to="/complaint-table" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">My Complaints</Link>
                  <button onClick={handleLogout} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-lg font-medium transition duration-300">Logout</button>
                </>
              )}
              {role === 'admin' && (
                <>
                  <Link to="/admin-dashboard" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Dashboard</Link>
                  <Link to="/pending-table" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Pending</Link>
                  <Link to="/in-progress-table" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">In Progress</Link>
                  <Link to="/solved-table" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Solved</Link>
                  <button onClick={handleLogout} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-lg font-medium transition duration-300">Logout</button>
                </>
              )}
              {role === 'worker' && (
                <>
                  <Link to="/worker-complaint-table" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Complaint</Link>
                  <Link to="/worker-solved-table" className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Solved</Link>
                  <button onClick={handleLogout} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-lg font-medium transition duration-300">Logout</button>
                </>
              )}
              
            </div>
          </div>
        </div> 
        </div> 
    </nav>
  );
};

export default Navbar;