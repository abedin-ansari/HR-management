// import "./App.css";
// import Dashboard from "./Page/Dashboard";
// import LoginForm from "./LoginForm";
// import { useState, useEffect } from "react";

// function App() {
//   const [employeeId, setEmployeeId] = useState(() => {
//     // Retrieve employeeId from localStorage if it exists, ensuring persistence
//     return localStorage.getItem("employeeId");
//   });

//   // Simulate login and get employee data
//   useEffect(() => {
//     if (!employeeId) {
//       const fetchEmployeeData = async () => {
//         try {
//           const response = await fetch("http://localhost:4050/users/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               email: "your_email@example.com",
//               password: "your_password",
//             }), // Replace with actual data
//           });

//           if (!response.ok) {
//             throw new Error(`Server error: ${response.status}`);
//           }

//           const data = await response.json();
//           setEmployeeId(data.employeeId); // Set employeeId in state
//           localStorage.setItem("employeeId", data.employeeId); // Store it in localStorage
//         } catch (error) {
//           console.error("Failed to fetch employee data:", error);
//         }
//       };

//       fetchEmployeeData();
//     }
//   }, [employeeId]);

//   return (
//     <div>
//       <LoginForm setEmployeeId={setEmployeeId} />
//       <Dashboard employeeId={employeeId} />
//     </div>
//   );
// }

// export default App;

import "./App.css";
import Header from "./Page/Dashboard/Header";
import AllRoutes from "./routes/allroutes"; // Importing the routes

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes /> {/* Your routing logic */}
    </div>
  );
}

export default App;
