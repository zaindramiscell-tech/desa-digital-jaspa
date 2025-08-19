# Sistem Informasi Desa Digital

Selamat datang di proyek Sistem Informasi Desa Digital. Aplikasi ini adalah sebuah platform berbasis web yang dirancang untuk membantu pemerintah desa dalam menyajikan informasi dan layanan kepada masyarakat secara modern dan transparan.

Proyek ini dibangun menggunakan tumpukan teknologi terkini untuk memastikan kinerja, skalabilitas, dan kemudahan pengembangan.

## Teknologi Utama

- **Framework:** [Next.js](https://nextjs.org/) (menggunakan App Router)
- **Database & Backend:** [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)

## Memulai Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Instal Dependensi:**
    ```bash
    npm install
    ```

2.  **Konfigurasi Lingkungan:**
    Buat file `.env.local` di direktori utama proyek dan isi dengan kredensial Firebase Anda. Lihat `DOCUMENTATION.md` untuk detail lengkapnya.

3.  **Jalankan Server Pengembangan:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:9002`.

4.  **Seeding Data Awal:**
    Untuk mengisi database dengan data contoh, kunjungi halaman `/admin/setup` setelah aplikasi berjalan dan ikuti instruksi di sana.

## Dokumentasi Lengkap

Untuk panduan yang lebih mendalam mengenai arsitektur, fitur, dan detail teknis lainnya, silakan merujuk ke file [DOCUMENTATION.md](DOCUMENTATION.md).
