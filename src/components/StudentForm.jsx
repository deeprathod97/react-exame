import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../store/slices/studentSlice';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    grade: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(formData));
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <input
            type="text"
            className="form-control"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="text"
            className="form-control"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;