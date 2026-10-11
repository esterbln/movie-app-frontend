# Movie App (Frontend)

Aplikasi web untuk mengelola dan membeli film, dibuat dengan **Vue 3** dan **Quasar**. Aplikasi ini adalah pasangan dari backend [`movie-rest-api`](https://github.com/esterbln/movie-rest-api): semua data (pengguna, genre, film, transaksi) diambil dan disimpan lewat API tersebut.

Proyek ini berawal dari latihan kuliah, lalu saya rapikan agar bisa dijalankan ulang oleh siapa pun.

## Tampilan

**Halaman admin: Master Movie**

![Halaman admin Master Movie](screenshots/admin-movie.png)

## Fitur

**Umum**
- Registrasi dan login pengguna
- Pembagian akses berdasarkan peran (admin dan user), dengan halaman yang berbeda untuk masing-masing

**Admin**
- Dasbor daftar transaksi, lengkap dengan konfirmasi transaksi
- Kelola genre (tambah, ubah, hapus)
- Kelola film (tambah, ubah, hapus) termasuk upload poster

**User**
- Daftar film bergambar poster
- Membeli film dengan menentukan jumlah (total harga dihitung otomatis)
- Riwayat transaksi pribadi

## Teknologi

| Bagian | Yang dipakai |
| --- | --- |
| Framework | Vue 3, Quasar 2 |
| Routing | Vue Router (mode hash) |
| State | Pinia |
| Komunikasi ke API | Axios |
| Sesi login | Cookie (lewat plugin Cookies milik Quasar) |

## Struktur folder

```
src/
├── boot/axios.js     # alamat API dan instance Axios
├── helper/           # format harga, daftar peran, penyimpanan profil
├── layouts/          # tata letak halaman admin dan user
├── pages/
│   ├── auth/         # login dan register
│   ├── admin/        # dasbor, genre, movie
│   └── user/         # daftar film dan transaksi
└── router/           # daftar route dan penjaga akses
```

## Cara menjalankan

Aplikasi ini **membutuhkan backend yang sedang berjalan**, jadi siapkan itu dulu.

1. **Jalankan API.** Ikuti petunjuk di repo [`movie-rest-api`](https://github.com/esterbln/movie-rest-api), sampai server menyala di `http://localhost:3000`. Pastikan MySQL juga menyala.
2. **Unduh atau clone repositori ini**, lalu masuk ke foldernya.
3. **Pasang dependensi** (disarankan Node.js versi 18 atau 20):
   ```
   npm install
   ```
4. **Jalankan aplikasi:**
   ```
   npm run dev
   ```
   Browser akan terbuka di `http://localhost:8080` dan menampilkan halaman login.

Alamat API ditulis langsung di `src/boot/axios.js` (`http://localhost:3000`). Kalau API berjalan di alamat lain, ubah nilainya di file itu.

## Membuat akun

Halaman register hanya membuat akun **user biasa**. Untuk mencoba sebagai admin:

1. Daftar akun seperti biasa lewat halaman register.
2. Di database `pem2-movie`, buka tabel `users`, lalu ubah kolom `role` pada akun itu dari `2` menjadi `1` (misalnya lewat phpMyAdmin).
3. Login ulang, dan halaman admin akan terbuka.

## Urutan mencoba

1. Login sebagai admin, lalu tambah beberapa **genre**.
2. Tambah beberapa **film** (judul, harga, genre, rating 1-5, deskripsi, dan poster JPG di bawah 2 MB).
3. Logout, lalu login sebagai user dan **beli** satu film.
4. Login lagi sebagai admin dan **konfirmasi** transaksinya di dasbor.

## Keterbatasan yang diketahui

Proyek ini adalah latihan, jadi beberapa hal belum dibuat:

- Pemisahan halaman admin dan user hanya dijaga di sisi aplikasi (lewat cookie). API belum memeriksa hak akses di sisi server.
- Alamat API masih tertulis langsung di kode, belum memakai variabel lingkungan.
- Belum ada pengujian otomatis.

## Pembuat

Ester Belen Wijaya, mahasiswa S1 Sistem Informasi, Universitas Bandar Lampung.
