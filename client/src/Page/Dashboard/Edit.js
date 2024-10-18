import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { updateEmployee } from "../../redux/employee/employeeAction";

function Edit({ selectedEmployee, setIsEditing }) {
  const dispatch = useDispatch();
  const id = selectedEmployee?._id;

  const [firstName, setFirstName] = useState(selectedEmployee?.firstName || "");
  const [lastName, setLastName] = useState(selectedEmployee?.lastName || "");
  const [email, setEmail] = useState(selectedEmployee?.email || "");
  const [salary, setSalary] = useState(selectedEmployee?.salary || "");

  useEffect(() => {
    if (selectedEmployee) {
      setFirstName(selectedEmployee.firstName);
      setLastName(selectedEmployee.lastName);
      setEmail(selectedEmployee.email);
      setSalary(selectedEmployee.salary);
    }
  }, [selectedEmployee]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const updatedData = {
      firstName,
      lastName,
      email,
      salary,
    };

    try {
      await dispatch(updateEmployee(id, updatedData));
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${firstName} ${lastName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update employee data.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
      />
      <button type="submit">Update Employee</button>
    </form>
  );
}

export default Edit;
