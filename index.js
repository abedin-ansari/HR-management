const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route.js");
const { dashboardrouter } = require("./routes/Dashboard.routes");
const attendanceRouter =
  require("./routes/attendanceRouter.js").attendanceRouter;
const cors = require("cors");
const { addEmployee } = require("./controllers/employeeController.js");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/api/dashboard", dashboardrouter);
app.use("/api/attendance", attendanceRouter);

app.post("/api/employees", addEmployee);

app.get("/", (req, res) => {
  res.send("Hello! Welcome to the home page.");
});

app.listen(4050, async () => {
  try {
    await connection;
    console.log("Connected to the database");
    console.log("Server is running at port 4050");
  } catch (err) {
    console.log(err);
  }
});
