import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TambahProduk from './components/TambahProduk';
import ProdukList from './components/ProdukList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleProdukDitambahkan = (produkBaru) => {
    setProduk([...produk, produkBaru]);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">TokoMapan</h1>
      <div className="row">
        <div className="col-md-6">
          <TambahProduk onProdukDitambahkan={handleProdukDitambahkan} />
        </div>
        <div className="col-md-6">
          <ProdukList produk={produk} setProduk={setProduk} />
        </div>
      </div>
    </div>
  );
}

export default App;
