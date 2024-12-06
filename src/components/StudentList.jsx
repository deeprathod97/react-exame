import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, setSortField, setFilter } from '../store/slices/studentSlice';
import StudentDetails from './StudentDetails';

const StudentList = () => {
  const dispatch = useDispatch();
  const { list: students, status, error, sortField, sortOrder, filter } = useSelector(state => state.students);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const handleSort = (field) => {
    dispatch(setSortField(field));
  };

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const getSortedAndFilteredStudents = () => {
    let filteredStudents = [...students];
    
    if (filter) {
      filteredStudents = filteredStudents.filter(student => 
        student.name.toLowerCase().includes(filter.toLowerCase()) ||
        student.course.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (sortField) {
      filteredStudents.sort((a, b) => {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return filteredStudents;
  };

  if (status === 'loading') {
    return <div className="container mt-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="container mt-4">Error: {error}</div>;
  }

  const sortedAndFilteredStudents = getSortedAndFilteredStudents();

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search students..."
            value={filter}
            onChange={handleFilter}
          />
        </div>
        <div className="col">
          <div className="btn-group">
            <button 
              className="btn btn-secondary"
              onClick={() => handleSort('name')}
            >
              Sort by Name
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleSort('course')}
            >
              Sort by Course
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {sortedAndFilteredStudents.map(student => (
          <div key={student.id} className="col-md-4 mb-3">
            <StudentDetails student={student} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;