import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProdukList({ produk, setProduk }) {
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then(response => setProduk(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("❌ Apakah Anda yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
        alert("✅ Produk telah dihapus!");
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (item) => {
    setEditData(item);  
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/produk/${editData.id}`, editData)
      .then(response => {
        setProduk(produk.map(item => (item.id === editData.id ? response.data : item)));
        setIsModalOpen(false);
        alert("✅ Produk berhasil diperbarui!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="text-center mb-3">🛍️ Daftar Produk</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>Rp{item.harga}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>🗑️ Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Produk</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nama Produk:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nama" 
                      value={editData?.nama || ''} 
                      onChange={handleChange} 
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Harga:</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="harga" 
                      value={editData?.harga || ''} 
                      onChange={handleChange} 
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Simpan</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsModalOpen(false)}>Batal</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProdukList;
