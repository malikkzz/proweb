import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TambahProduk from './components/TambahProduk';
import ProdukList from './components/ProdukList';

function App() {
    const [produk, setProduk] = useState([]);
    const [notif, setNotif] = useState(""); // ⬅️ State untuk menyimpan notifikasi

    // Ambil data produk saat halaman dimuat
    useEffect(() => {
        axios.get('http://localhost:3001/produk')
            .then((response) => setProduk(response.data))
            .catch((error) => console.error(error));
    }, []);

    // Fungsi untuk menampilkan notifikasi dan menghilangkannya setelah 3 detik
    const tampilkanNotif = (pesan) => {
        setNotif(pesan);
        setTimeout(() => setNotif(""), 3000); // Notifikasi hilang setelah 3 detik
    };

    // Fungsi untuk menambahkan produk tanpa refresh
    const tambahProdukKeList = (produkBaru) => {
        setProduk([...produk, produkBaru]);
        tampilkanNotif("✅ Produk Berhasil Ditambahkan!");
    };

    return (
        <div>
            <h1>Aplikasi E-Commerce Sederhana</h1>

            {/* Notifikasi Pop-up */}
            {notif && <div className="notif">{notif}</div>}

            <TambahProduk onProdukDitambahkan={tambahProdukKeList} />
            <ProdukList produk={produk} setProduk={setProduk} tampilkanNotif={tampilkanNotif} />
        </div>
    );
}

export default App;
