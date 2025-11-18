import { buku } from "../data/buku.js";
import { usersData } from "../data/user.js";

export function getAllBook(req, res) {
  res.status(200).json({
    msg: "Success",
    data: buku,
  });
}

export function getBookById(req, res) {
  const id = Number(req.params.id);
  const listBuku = buku.find(b => b.id === id);

  if (!listBuku) {
    return res.status(404).json({ msg: "Buku tidak ditemukan" });
  }

  res.json(listBuku);
}


export function createBook(req, res) {
  const { nama } = req.body;
  const namaPeminjam = "";
  buku.push({
    id: buku.length + 1,
    nama: nama,
    namaPeminjam: namaPeminjam,
  });

  res.status(201).json({
    msg: "book was created",
    data: buku.at(-1),
  });
}

export function updateBook(req, res) {
  const { nama } = req.body;
  const namaPeminjam = "";
  buku.push({
    id: buku.id,
    nama: nama,
    namaPeminjam: namaPeminjam,
  });

  res.status(201).json({
    msg: "book was updated",
    data: buku.at(-1),
  });
}

export function borrowBook(req, res) {
  const { id } = req.params;
  const { namaPeminjam = "" } = req.body;

  const index = buku.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).json({ msg: `buku telah dipinjam` });
  }
  const nama = buku[index].nama;

  buku[index] = {
    id: Number(id),
    nama,
    namaPeminjam: namaPeminjam,
  };

  res.status(200).json({
    msg: `buku telah dipinjam oleh ${namaPeminjam}`,
    data: buku[index],
  });
}

export function deleteBook(req, res) {
  const { id } = req.params;
  let index = id - 1;
  buku.splice(index, 1);

  res.status(200).json({ msg: "buku telah dihapus" });
}

export function checkRole(allowedRoles) {
  return (req, res, next) => {
    const { username } = req.body;

    const user = usersData.find(u => u.username === username);

    if (!user) {
      return res.status(404).json({ msg: "username tidak ditemukan" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(404).json({ msg: "user tidak punya izin" });
    }

    next();
  };
}
