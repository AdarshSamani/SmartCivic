import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ComplaintForm() {
  const [wing, setWing] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const utility = new URLSearchParams(location.search).get('utility');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file)
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('utility', utility);
      formData.append('wing', wing);
      formData.append('roomNo', roomNo);
      formData.append('description', description);
      formData.append('phoneNumber', phoneNumber);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setError('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          File a Complaint - {utility}
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="wing" className="block text-xl font-medium text-gray-700 mb-2">
              Wing
            </label>
            <input
              type="text"
              id="wing"
              name="wing"
              required
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={wing}
              onChange={(e) => setWing(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="roomNo" className="block text-xl font-medium text-gray-700 mb-2">
              Room Number
            </label>
            <input
              type="text"
              id="roomNo"
              name="roomNo"
              required
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-xl font-medium text-gray-700 mb-2">
              Upload Image (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {previewUrl && (
              <div className="mt-2">
                <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-xl font-medium text-gray-700 mb-2">
              Complaint Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-xl font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-2xl font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;