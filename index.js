const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
// ========================================>
// =========== Database Connection ========>
// ========================================>
const mySQL = require("mysql");
const connection = mySQL.createConnection({
  host: "localhost",
  database: "user-api",
  user: "root",
  password: "",
});
// ========================================>
// Middleware to Covert BufferData && Enable All Cors Requests
app.use(express.json(), cors());
// Endpoit of Home Page
app.get("/", (request, response) => {
  return response.redirect("/users");
});
// ====================================================>
// =============== User Query =========================>
// ====================================================>
// 01- GET All Users
app.get("/users", (request, response) => {
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      response.json({ message: "Error", err });
    } else {
      response.json({ message: "Success", result });
    }
  });
});
// 02- Add User
app.post("/addUser", (request, response) => {
  const { name, email, password, age } = request.body;
  connection.query(
    "INSERT INTO users SET name = ?, email = ?, password = ?, age = ?",
    [name, email, password, age],
    (err, result) => {
      if (err) {
        return response.json({ message: "Error", err });
      } else {
        console.log("Added Successfully");
        return response.json({ message: "Success" });
      }
    }
  );
});
// 03- Update User
app.post("/updateUser", (request, response) => {
  const { id, name, email, password, age } = request.body;
  connection.query(
    `UPDATE users SET name = ?, email = ?, password = ?, 
    age = ? WHERE id = ?`,
    [name, email, password, age, id],
    (err, result) => {
      if (err) {
        return response.json({ message: "Error", err });
      } else {
        console.log("Updated Successfully");
        return response.json({ message: "Success" });
      }
    }
  );
});
// 04- Delete User
app.post("/deleteUser", (request, response) => {
  const { id } = request.body;
  connection.query("DELETE From users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return response.json({ message: "Error", err });
    } else {
      console.log("Deleted Successfully");
      return response.json({ message: "Success" });
    }
  });
});
// To Handle Routing Errors
app.use((request, response) => {
  return response.send("Error 404 Page Not Found !");
});
app.listen(port, () => {
  console.log(`Server Is Running......Port   ${port}`);
});
