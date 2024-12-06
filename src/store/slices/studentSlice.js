import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data to replace JSON server
const mockStudents = [
  {
    id: 1,
    name: "Deep",
    email: "deep@example.com",
    course: "Computer Science",
    grade: "A",
    rollNumber: "CS001"
  },
  {
    id: 2,
    name: "Mihir",
    email: "Mihir@example.com",
    course: "Mathematics",
    grade: "B+",
    rollNumber: "MT002"
  },
  {
    id: 3,
    name: "Deep",
    email: "deep@example.com",
    course: "Computer Science",
    grade: "A",
    rollNumber: "CS001"
  },
  {
    id: 4,
    name: "Smith",
    email: "smith@example.com",
    course: "Mathematics",
    grade: "B+",
    rollNumber: "MT001"
  }
];

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStudents), 500);
    });
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (student) => {
    // Simulate API call
    return new Promise((resolve) => {
      const newStudent = {
        ...student,
        id: Date.now(),
        rollNumber: `ST${Math.floor(Math.random() * 1000)}`
      };
      setTimeout(() => resolve(newStudent), 500);
    });
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }) => {
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...data, id }), 500);
    });
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id) => {
  
    return new Promise((resolve) => {
      setTimeout(() => resolve(id), 500);
    });
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    sortField: null,
    sortOrder: 'asc',
    filter: '',
  },
  reducers: {
    setSortField: (state, action) => {
      state.sortField = action.payload;
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter(student => student.id !== action.payload);
      });
  }
});

export const { setSortField, setFilter } = studentSlice.actions;
export default studentSlice.reducer;