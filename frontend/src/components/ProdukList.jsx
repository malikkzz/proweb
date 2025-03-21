import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Daftar Produk</h2>
      <ul>
        {produk.map((item) => (
          <li key={item.id}>
            {item.nama} - Rp{item.harga}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Produk</h3>
            <form onSubmit={handleSubmit}>
              <label>Nama Produk:</label>
              <input 
                type="text" 
                name="nama" 
                value={editData.nama} 
                onChange={handleChange} 
                required
              />
              <label>Harga:</label>
              <input 
                type="number" 
                name="harga" 
                value={editData.harga} 
                onChange={handleChange} 
                required
              />
              <button type="submit">Simpan</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Batal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
