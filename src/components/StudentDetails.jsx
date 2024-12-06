import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStudent, deleteStudent } from '../store/slices/studentSlice';

const StudentDetails = ({ student }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ id: student.id, data: editData }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(student.id));
    }
  };

  if (isEditing) {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Course</label>
              <input
                type="text"
                className="form-control"
                value={editData.course}
                onChange={(e) => setEditData({ ...editData, course: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Grade</label>
              <input
                type="text"
                className="form-control"
                value={editData.grade}
                onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{student.name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {student.email}<br />
          <strong>Course:</strong> {student.course}<br />
          <strong>Grade:</strong> {student.grade}<br />
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;