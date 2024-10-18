// import React, { useState, useRef, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import { addEmployee } from "../../redux/employee/employeeAction";
// import axios from "axios";

// function Add({ setIsAdding }) {
//   const dispatch = useDispatch();

//   // State for new fields
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [salary, setSalary] = useState("");
//   const [department, setDepartment] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [jobRole, setJobRole] = useState("");
//   const [performanceReview, setPerformanceReview] = useState("");
//   const [file, setFile] = useState(null); // File for document upload
//   const [date, setDate] = useState("");

//   const textInput = useRef(null);

//   useEffect(() => {
//     textInput.current.focus();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !salary ||
//       !department ||
//       !date ||
//       !phoneNumber ||
//       !address ||
//       !jobRole
//     ) {
//       return Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "All fields are required.",
//         showConfirmButton: true,
//       });
//     }

//     const newEmployee = {
//       firstName,
//       lastName,
//       email,
//       salary,
//       department,
//       phoneNumber,
//       address,
//       jobRole,
//       date,
//       performanceHistory: [{ review: performanceReview }],
//     };

//     // Dispatch action
//     dispatch(addEmployee(newEmployee));

//     // If document upload is needed
//     if (file) {
//       const formData = new FormData();
//       formData.append("document", file);
//       await axios.post(
//         "http://localhost:4050/api/dashboard/uploadDocument",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//     }

//     setIsAdding(false);

//     Swal.fire({
//       icon: "success",
//       title: "Added!",
//       text: `${firstName} ${lastName}'s data has been Added.`,
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employee/employeeAction";

function Add({ setIsAdding }) {
  const dispatch = useDispatch();

  // State for new fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [performanceReview, setPerformanceReview] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !salary ||
      !department ||
      !date ||
      !phoneNumber ||
      !address ||
      !jobRole
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
      salary,
      department,
      phoneNumber,
      address,
      jobRole,
      date,
      performanceHistory: [{ review: performanceReview }],
    };

    // Dispatch action
    await dispatch(addEmployee(newEmployee));

    // Reset fields after adding
    setFirstName("");
    setLastName("");
    setEmail("");
    setSalary("");
    setDepartment("");
    setPhoneNumber("");
    setAddress("");
    setJobRole("");
    setPerformanceReview("");
    setDate("");

    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label htmlFor="department">Department</label>
        <input
          id="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="jobRole">Job Role</label>
        <input
          id="jobRole"
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />

        <label htmlFor="performanceReview">Performance Review</label>
        <textarea
          id="performanceReview"
          value={performanceReview}
          onChange={(e) => setPerformanceReview(e.target.value)}
        />

        <label htmlFor="document">
          Upload Document (Resume, Certifications)
        </label>
        <input
          id="document"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
