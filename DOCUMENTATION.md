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
- **Visualisasi Data:** [Recharts](https://recharts.org/)
- **Manajemen Form:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 3. Struktur Folder Proyek

Struktur folder utama dari proyek ini adalah sebagai berikut:

```
.
├── src
│   ├── app                 # Halaman dan routing (App Router)
│   │   ├── admin           # Halaman khusus panel admin
│   │   ├── berita          # Halaman daftar dan detail berita
│   │   ├── data            # Halaman untuk data desa (IDM, SDGs, dll)
│   │   ├── (grup lainnya)  # Halaman publik seperti profil, login, dll.
│   │   ├── layout.tsx      # Layout utama aplikasi
│   │   └── page.tsx        # Halaman beranda
│   │
│   ├── components          # Komponen React yang dapat digunakan kembali
│   │   ├── admin           # Komponen spesifik untuk dasbor admin
│   │   ├── berita          # Komponen terkait tampilan berita (Card, dll)
│   │   ├── data            # Komponen visualisasi data (Grafik, Chart)
│   │   ├── layout          # Komponen layout (Navbar, Footer, ThemeToggle)
│   │   └── ui              # Komponen dasar dari ShadCN (Button, Card, dll)
│   │
│   ├── lib                 # Logika bisnis, utilitas, dan koneksi ke backend
│   │   ├── firebase        # Konfigurasi koneksi ke Firebase
│   │   ├── berita.ts       # Fungsi CRUD untuk data berita
│   │   ├── dataDesa.ts     # Fungsi CRUD untuk data demografi
│   │   ├── idm.ts          # Fungsi CRUD untuk data IDM
│   │   ├── profilDesa.ts   # Fungsi CRUD untuk data profil desa
│   │   ├── sdgs.ts         # Fungsi CRUD untuk data SDGs
│   │   ├── setelan.ts      # Fungsi CRUD untuk setelan website
│   │   └── utils.ts        # Fungsi utilitas (seperti `cn` untuk classname)
│   │
│   └── hooks               # React hooks kustom (e.g., use-toast)
│
├── public                  # Aset statis (gambar, ikon, dll)
├── package.json            # Daftar dependensi dan skrip proyek
└── next.config.ts          # Konfigurasi Next.js
```

---

## 4. Fitur Utama

### A. Halaman Publik

- **Beranda:** Menampilkan ringkasan informasi, termasuk hero carousel dan berita terkini.
- **Profil Desa:** Halaman statis yang menampilkan sejarah, visi, dan misi desa.
- **Berita:** Daftar semua berita dengan fitur pencarian dan halaman detail untuk setiap artikel.
- **Data Desa:** Halaman interaktif yang menyajikan data desa:
  - **Demografi:** Grafik jumlah penduduk, KK, dan komposisi usia.
  - **Indeks Desa Membangun (IDM):** Kartu informasi dan grafik radar untuk skor IKS, IKE, dan IKL.
  - **SDGs Desa:** Tampilan 18 tujuan SDGs beserta skor capaiannya.
- **Mode Terang/Gelap:** Tombol untuk mengubah tema tampilan situs.

### B. Panel Admin (`/admin`)

- **Akses Terbatas:** Halaman admin dilindungi dan memerlukan login.
- **Manajemen Berita:**
  - Tambah, Edit, dan Hapus (CRUD) berita.
  - Unggah gambar dari komputer atau gunakan tautan langsung dari Google Drive.
- **Manajemen Konten:**
  - **Profil Desa:** Mengubah teks sejarah, visi, dan misi.
  - **Data Demografi:** Memperbarui angka-angka kependudukan.
  - **Data IDM:** Mengubah skor IKS, IKE, dan IKL. Skor IDM dan status terhitung otomatis.
  - **Data SDGs:** Memperbarui skor untuk setiap dari 18 tujuan SDGs.
- **Setelan Website:**
  - Mengubah Nama Desa, Deskripsi Situs, dan informasi kontak yang ditampilkan di seluruh situs.

---

## 5. Menjalankan Proyek Secara Lokal

1.  **Instalasi Dependensi:**
    Pastikan Anda memiliki Node.js dan npm terinstal. Jalankan perintah berikut di terminal:
    ```bash
    npm install
    ```

2.  **Menjalankan Server Pengembangan:**
    Untuk menjalankan aplikasi dalam mode pengembangan, gunakan perintah:
    ```bash
    npm run dev
    ```
    Aplikasi akan tersedia di [http://localhost:9002](http://localhost:9002).

---

## 6. Konfigurasi Firebase

- Koneksi ke Firebase diatur dalam file `src/lib/firebase/config.ts`.
- Pastikan kredensial Firebase yang ada di dalam file tersebut sesuai dengan proyek Firebase yang Anda gunakan.
- Aplikasi ini menggunakan layanan Firebase berikut:
  - **Firestore:** Sebagai database NoSQL untuk menyimpan semua data konten.
  - **Firebase Storage:** Untuk menyimpan gambar yang diunggah.
  - **Firebase Authentication:** Untuk mengelola akun admin.
