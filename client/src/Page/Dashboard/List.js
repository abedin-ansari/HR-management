// import React from "react";

// function List({
//   employees,
//   handleEdit,
//   handleDelete,
//   handleClockIn,
//   handleClockOut,
// }) {
//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: null,
//   });

//   return (
//     <div className="contain-table">
//       <table className="striped-table">
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Salary</th>
//             <th>Date</th>
//             <th colSpan={2} className="text-center">
//               Actions
//             </th>
//             <th>Attendance</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length > 0 ? (
//             employees.map((employee, i) => (
//               <tr key={employee.id || i}>
//                 <td>{i + 1}</td>
//                 <td>{employee.firstName}</td>
//                 <td>{employee.lastName}</td>
//                 <td>{employee.email}</td>
//                 <td>{formatter.format(employee.salary)}</td>
//                 <td>{new Date(employee.date).toLocaleDateString()}</td>
//                 <td className="text-right">
//                   <button
//                     onClick={() => handleEdit(employee.id)}
//                     className="button muted-button"
//                   >
//                     Edit
//                   </button>
//                 </td>
//                 <td className="text-left">
//                   <button
//                     onClick={() => handleDelete(employee)}
//                     className="button muted-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 {/* <td>
//                   <button
//                     onClick={() => handleClockIn(employee.id)}
//                     className="button green-button"
//                     disabled={!!employee.clockInTime && !employee.clockOutTime}
//                   >
//                     Clock In
//                   </button>
//                   <button
//                     onClick={() => handleClockOut(employee.id)}
//                     className="button red-button"
//                     disabled={!employee.clockInTime || employee.clockOutTime}
//                   >
//                     Clock Out
//                   </button>
//                 </td> */}
//                 <td>
//                   <button
//                     onClick={() => handleClockIn(employee._id || employee.id)} // Use correct employee ID
//                     className="button green-button"
//                     disabled={!!employee.clockInTime && !employee.clockOutTime}
//                   >
//                     Clock In
//                   </button>
//                   <button
//                     onClick={() => handleClockOut(employee._id || employee.id)} // Similarly, for clock out
//                     className="button red-button"
//                     disabled={!employee.clockInTime || employee.clockOutTime}
//                   >
//                     Clock Out
//                   </button>
//                 </td>

//                 <td>
//                   {employee.clockOutTime
//                     ? "Clocked Out"
//                     : employee.clockInTime
//                     ? `Clocked In at ${employee.clockInTime}`
//                     : "Not Clocked In"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={10}>No Employees</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default List;

import React from "react";

function List({
  employees,
  handleEdit,
  handleDelete,
  handleClockIn,
  handleClockOut,
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
            <th>Attendance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee._id || i}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{new Date(employee.date).toLocaleDateString()}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee._id || employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleClockIn(employee._id || employee.id)}
                    className="button green-button"
                    disabled={!!employee.clockInTime && !employee.clockOutTime}
                  >
                    Clock In
                  </button>
                  <button
                    onClick={() => handleClockOut(employee._id || employee.id)}
                    className="button red-button"
                    disabled={!employee.clockInTime || employee.clockOutTime}
                  >
                    Clock Out
                  </button>
                </td>
                <td>
                  {employee.clockOutTime
                    ? "Clocked Out"
                    : employee.clockInTime
                    ? `Clocked In at ${new Date(
                        employee.clockInTime
                      ).toLocaleTimeString()}`
                    : "Not Clocked In"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;

// import React from "react";

// function List({
//   employees,
//   handleEdit,
//   handleDelete,
//   handleClockIn,
//   handleClockOut,
// }) {
//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: null,
//   });

//   return (
//     <div className="contain-table">
//       <table className="striped-table">
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Salary</th>
//             <th>Date</th>
//             <th colSpan={2} className="text-center">
//               Actions
//             </th>
//             <th>Attendance</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length > 0 ? (
//             employees.map((employee, i) => (
//               <tr key={employee.id || i}>
//                 <td>{i + 1}</td>
//                 <td>{employee.firstName}</td>
//                 <td>{employee.lastName}</td>
//                 <td>{employee.email}</td>
//                 <td>{formatter.format(employee.salary)}</td>
//                 <td>{new Date(employee.date).toLocaleDateString()}</td>
//                 <td className="text-right">
//                   <button
//                     onClick={() => handleEdit(employee.id)}
//                     className="button muted-button"
//                   >
//                     Edit
//                   </button>
//                 </td>
//                 <td className="text-left">
//                   <button
//                     onClick={() => handleDelete(employee)}
//                     className="button muted-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleClockIn(employee._id || employee.id)} // Ensure you're passing the correct employee ID
//                     className="button green-button"
//                     disabled={!!employee.clockInTime && !employee.clockOutTime}
//                   >
//                     Clock In
//                   </button>
//                   <button
//                     onClick={() => handleClockOut(employee._id || employee.id)} // Similarly, for clock out
//                     className="button red-button"
//                     disabled={!employee.clockInTime || employee.clockOutTime}
//                   >
//                     Clock Out
//                   </button>
//                 </td>

//                 <td>
//                   {employee.clockOutTime
//                     ? "Clocked Out"
//                     : employee.clockInTime
//                     ? `Clocked In at ${new Date(
//                         employee.clockInTime
//                       ).toLocaleTimeString()}`
//                     : "Not Clocked In"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={10}>No Employees</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default List;
