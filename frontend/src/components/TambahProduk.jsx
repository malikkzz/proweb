import React, { useState } from 'react';
import axios from 'axios';

function TambahProduk({ onProdukDitambahkan }) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !harga) {
      setError('Nama dan Harga wajib diisi');
      return;
    }

    setError('');
    axios.post('http://localhost:3001/produk', { nama, harga })
      .then((res) => {
        onProdukDitambahkan(res.data);
        setNama('');
        setHarga('');
        alert('Produk Berhasil Ditambahkan');
      })
      .catch((err) => console.error('Error menambah produk:', err));
  };

  return (
    <div className="card p-3 shadow">
      <h2 className="text-center">Tambah Produk</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Produk:</label>
          <input 
            type="text" 
            className="form-control" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga:</label>
          <input 
            type="number" 
            className="form-control" 
            value={harga} 
            onChange={(e) => setHarga(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Simpan</button>
      </form>
    </div>
  );
}

export default TambahProduk;
