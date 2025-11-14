import express from "express";
import { buku } from "./data/buku.js";
const app = express();
app.use(express.json());

// Menggunakan Method GET
app.get("/users", function (req, res) {
  res.status(200).json({ msg: "Succes", data: buku });
});

// Menggunakan Method POST
app.post("/users", function (req, res) {
  const { nama } = req.body;
  buku.push({
    id: buku.length + 1,
    nama: nama,
  });

  res.status(201).json({
    msg: "book was created",
    data: buku.at(-1),
  });
});

// Menggunakan Method PUT
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  const { namaPeminjam } = req.body;

  const index = buku.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).json({ msg: `buku telah dipinjam` });
  }

  buku[index] = {
    id: Number(id),
    nama,
    namaPeminjam: namaPeminjam,
  };

  res.status(200).json({ msg: `buku telah dipinjam ${namaPeminjam}`, data: buku[index] });
});

// Menggunakan Method DELETE
app.delete("/users/:id", function (req, res) {
  const { id } = req.params;
  let index = id - 1;
  buku.splice(index, 1);

  res.status(200).json({ msg: `data sudah dihapus` });
});

app.listen(3000, function () {
  console.log("Pesan Ini Jalan Di Port 3000");
});
