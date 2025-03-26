import React, { useState } from 'react';
import axios from 'axios';

function TambahProduk({ onProdukDitambahkan }) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !harga) {
      setShowPopup(true);
      return;
    }

    axios.post('http://localhost:3001/produk', { nama, harga })
      .then((res) => {
        onProdukDitambahkan(res.data);
        setNama('');
        setHarga('');
        alert('✅ Produk Berhasil Ditambahkan!');
      })
      .catch((err) => console.error('Error menambah produk:', err));
  };

  return (
    <div className="card p-3 shadow">
      <h2 className="text-center">Tambah Produk</h2>
      
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

      {/* Pop-up notifikasi */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Nama dan Harga wajib diisi!</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Styling pop-up dengan z-index tinggi */}
      <style>
        {`
          .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* Pop-up selalu di atas */
          }

          .popup-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
          }

          .popup-content button {
            background: linear-gradient(135deg, #008080, #004D40);
            color: white;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 5px;
          }

          .popup-content button:hover {
            background: linear-gradient(135deg, #008080, #004D40);
          }
        `}
      </style>
    </div>
  );
}

export default TambahProduk;
