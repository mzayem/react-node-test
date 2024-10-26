const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

// Get all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents();
  res.status(200).json(students);
});

// Add a new student
const handleAddStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;

  const result = await addNewStudent(studentData);
  res.status(201).json(result); // 201 Created
});

// Update a student's details
const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  updatedData.id = id; // Adding id to the payload for the update

  const result = await updateStudent(updatedData);
  res.status(200).json(result); // 200 OK
});

// Get details of a specific student
const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const student = await getStudentDetail(id);
  res.status(200).json(student);
});

// Set a student's status (e.g., active or inactive)
const handleStudentStatus = asyncHandler(async (req, res) => {
  const { userId, reviewerId, status } = req.body;

  const result = await setStudentStatus({ userId, reviewerId, status });
  res.status(200).json(result); // 200 OK
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
