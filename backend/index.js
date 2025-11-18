import express from "express";
import {
  borrowBook,
  checkRole,
  createBook,
  deleteBook,
  getAllBook,
  getBookById,
  updateBook,
} from "./utils/function.js";
const app = express();
app.use(express.json());

// Menggunakan Method GET
app.get("/users", checkRole(["admin", "student"]), getAllBook);
app.get("/users/:id", checkRole(["admin", "student"]), getBookById);

// Menggunakan Method POST
app.post("/users/:id", checkRole(["student"]), borrowBook);
app.post("/users", checkRole(["admin"]), createBook);

// Menggunakan Method PUT
app.put("/users/:id", checkRole(["admin"]), updateBook);

// Menggunakan Method DELETE
app.delete("/users/:id", checkRole(["admin"]), deleteBook);

app.listen(3000, function () {
  console.log("Pesan Ini Jalan Di Port 3000");
});
