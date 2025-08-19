# Dokumentasi Proyek Sistem Informasi Desa Digital

## 1. Deskripsi Proyek

Aplikasi ini adalah sebuah Sistem Informasi Desa (SID) berbasis web yang dibangun menggunakan Next.js dan Firebase. Tujuannya adalah untuk menyediakan platform digital bagi pemerintah desa untuk menyajikan informasi, berita, dan data penting kepada masyarakat secara transparan dan mudah diakses. Aplikasi ini juga dilengkapi dengan panel admin untuk mengelola seluruh konten yang ditampilkan di situs publik.

---

## 2. Teknologi yang Digunakan

- **Framework:** [Next.js](https://nextjs.org/) (dengan App Router)
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Komponen UI:** [ShadCN/UI](https://ui.shadcn.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore, Firebase Storage, Firebase Authentication)
- **Manajemen Form:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 3. Struktur Folder Proyek

Struktur folder utama dari proyek ini adalah sebagai berikut:

```
.
├── src
│   ├── app                 # Halaman dan routing (App Router)
│   │   ├── admin           # Halaman khusus panel admin
│   │   ├── (halaman lain)  # Halaman publik seperti berita, profil, dll.
│   │   ├── layout.tsx      # Layout utama aplikasi
│   │   └── page.tsx        # Halaman beranda
│   │
│   ├── components          # Komponen React yang dapat digunakan kembali
│   │   ├── admin           # Komponen spesifik untuk dasbor admin
│   │   ├── layout          # Komponen layout (Navbar, Footer, dll)
│   │   └── ui              # Komponen dasar dari ShadCN
│   │
│   ├── lib                 # Logika bisnis, utilitas, dan koneksi ke backend
│   │   ├── firebase        # Konfigurasi koneksi ke Firebase
│   │   └── (file lainnya)  # Fungsi CRUD untuk setiap fitur
│   │
│   └── hooks               # React hooks kustom
│
├── public                  # Aset statis (gambar, ikon, dll)
└── package.json            # Daftar dependensi dan skrip proyek
```

---

## 4. Fitur Utama

### A. Halaman Publik

- **Beranda:** Menampilkan ringkasan informasi, termasuk hero carousel dan berita terkini.
- **Profil Desa:** Halaman statis yang menampilkan sejarah, visi, dan misi desa.
- **Berita:** Daftar semua berita dengan fitur pencarian dan halaman detail untuk setiap artikel.
- **Data Desa:** Halaman interaktif yang menyajikan data desa (Demografi, IDM, SDGs).
- **Mode Terang/Gelap:** Tombol untuk mengubah tema tampilan situs.

### B. Panel Admin (`/admin`)

- **Akses Terbatas:** Halaman admin dilindungi dan memerlukan login.
- **Manajemen Konten:** CRUD (Tambah, Edit, Hapus) untuk Berita, Profil Desa, Data Demografi, Data IDM, dan Data SDGs.
- **Setelan Website:** Mengubah informasi umum seperti nama desa dan kontak.

---

## 5. Menjalankan Proyek Secara Lokal

1.  **Konfigurasi Variabel Lingkungan:**
    Buat file baru bernama `.env.local` di root proyek. Salin semua variabel dari file `.env` ke dalam `.env.local` dan isi nilainya sesuai dengan kredensial proyek Firebase Anda. Awalan `NEXT_PUBLIC_` wajib ada agar Next.js dapat mengakses variabel tersebut di sisi klien.
    ```bash
    # .env.local
    NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="nama-proyek.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="nama-proyek"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="nama-proyek.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123..."
    NEXT_PUBLIC_FIREBASE_APP_ID="1:123...:web:..."
    ```

2.  **Instalasi Dependensi:**
    Pastikan Anda memiliki Node.js dan npm terinstal. Jalankan perintah berikut di terminal:
    ```bash
    npm install
    ```

3.  **Menjalankan Server Pengembangan:**
    Untuk menjalankan aplikasi dalam mode pengembangan, gunakan perintah:
    ```bash
    npm run dev
    ```
    Aplikasi akan tersedia di [http://localhost:9002](http://localhost:9002).

4.  **Mengisi Database dengan Data Awal (Seeding):**
    Setelah aplikasi berjalan, buka peramban Anda dan kunjungi rute `/admin/setup`. Halaman ini berisi tombol untuk mengisi (seed) database Firestore Anda dengan data contoh untuk semua fitur, termasuk berita, profil, pengguna admin default, dan lainnya. **Ini hanya perlu dilakukan sekali saat pertama kali menyiapkan proyek.**

---

## 6. Konfigurasi Firebase

- Koneksi ke Firebase diatur dalam file `src/lib/firebase/config.ts`.
- Aplikasi ini menggunakan layanan Firebase berikut:
  - **Firestore:** Sebagai database NoSQL.
  - **Firebase Storage:** Untuk menyimpan gambar.
  - **Firebase Authentication:** Untuk mengelola akun admin.
- **Aturan Keamanan (Security Rules):** Aturan keamanan diatur dalam `firestore.rules`. Untuk lingkungan produksi, pastikan hanya pengguna terautentikasi dengan peran `admin` yang dapat menulis data.