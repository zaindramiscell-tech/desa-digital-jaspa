
import { db, storage } from './firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, Timestamp, query, orderBy, where, serverTimestamp, writeBatch, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { OutputData } from '@editorjs/editorjs';

export interface Berita {
  id: string;
  judul: string;
  isi: OutputData; // Editor.js data
  gambarUrl: string;
  tanggalPublikasi: Timestamp;
}

export interface BeritaClient {
    id: string;
    judul: string;
    isi: OutputData;
    gambarUrl: string;
    tanggalPublikasi: string; // Already string for client safety
}

// This interface is for writing data to Firestore
export interface BeritaTulis {
  judul: string;
  isi: OutputData; // Editor.js data object
  gambarUrl?: string | null; // This can be a direct URL from input
  gambar?: File | null; // This is for file upload
}

const beritaCollection = collection(db, 'berita');

export const seedBerita = async () => {
    const snapshot = await getDocs(query(beritaCollection));
    if (snapshot.empty) {
        console.log("Koleksi 'berita' kosong, menambahkan data mock...");
        const batch = writeBatch(db);
        const mockBerita = [
            {
                judul: "Pembangunan Jembatan Desa Selesai Lebih Cepat dari Jadwal",
                isi: {
                    "time": 1700000000000,
                    "blocks": [
                        { "type": "header", "data": { "text": "Akses Antar Dusun Kini Lebih Mudah", "level": 2 }},
                        { "type": "paragraph", "data": { "text": "Jembatan utama yang menghubungkan dusun Harapan dan dusun Makmur telah rampung dan diresmikan oleh Kepala Desa. Pembangunan yang didanai oleh dana desa ini selesai dua minggu lebih cepat dari target, membawa kelegaan bagi warga yang kini dapat melintasi sungai dengan aman dan cepat." }}
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1599691535593-b3e364734a74?q=80&w=1170&auto=format&fit=crop",
            },
            {
                judul: "Festival Budaya Lokal Meriahkan Akhir Pekan",
                isi: {
                    "time": 1700000100000,
                    "blocks": [
                        { "type": "header", "data": { "text": "Melestarikan Tradisi, Menyatukan Warga", "level": 2 }},
                        { "type": "paragraph", "data": { "text": "Lapangan desa dipenuhi oleh warga yang antusias menyaksikan berbagai pertunjukan seni dan budaya dalam Festival Budaya tahunan. Acara ini menampilkan tari-tarian tradisional, pameran kerajinan tangan, dan kuliner khas desa yang berhasil menarik perhatian tidak hanya warga lokal tetapi juga pengunjung dari luar daerah." }}
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1170&auto=format&fit=crop",
            },
            {
                judul: "Program Pelatihan Pertanian Organik Tingkatkan Hasil Panen",
                isi: {
                    "time": 1700000200000,
                    "blocks": [
                        { "type": "header", "data": { "text": "Menuju Pertanian Berkelanjutan", "level": 2 }},
                        { "type": "paragraph", "data": { "text": "Kelompok tani desa berhasil meningkatkan hasil panen hingga 30% setelah mengikuti program pelatihan pertanian organik. Inisiatif ini mengajarkan metode pertanian ramah lingkungan tanpa pestisida kimia, yang tidak hanya meningkatkan kuantitas tetapi juga kualitas hasil panen sayuran dan buah-buahan." }}
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1074&auto=format&fit=crop",
            },
            {
                judul: "Digitalisasi Layanan Kependudukan Kini Hadir di Desa",
                isi: {
                    "time": 1700000300000,
                    "blocks": [
                        { "type": "header", "data": { "text": "Urus Surat-surat Lebih Cepat dan Mudah", "level": 2 }},
                        { "type": "paragraph", "data": { "text": "Pemerintah desa meluncurkan sistem layanan kependudukan berbasis online. Kini, warga dapat mengurus surat keterangan, akta kelahiran, dan dokumen lainnya melalui aplikasi mobile atau situs web desa, memangkas waktu dan birokrasi yang sebelumnya panjang." }}
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1080&auto=format&fit=crop",
            },
            {
                judul: "Anak-Anak Desa Antusias Sambut Perpustakaan Keliling",
                isi: {
                    "time": 1700000400000,
                    "blocks": [
                        { "type": "header", "data": { "text": "Meningkatkan Minat Baca Sejak Dini", "level": 2 }},
                        { "type": "paragraph", "data": { "text": "Program perpustakaan keliling yang digagas oleh karang taruna mendapat sambutan hangat dari anak-anak. Setiap sore, mobil perpustakaan mengunjungi berbagai dusun, menyediakan akses ke ratusan buku cerita, ilmu pengetahuan, dan majalah anak-anak secara gratis." }}
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop",
            }
        ];

        mockBerita.forEach(berita => {
            const docRef = doc(beritaCollection);
            batch.set(docRef, { ...berita, tanggalPublikasi: serverTimestamp() });
        });

        await batch.commit();
        console.log("Data mock berita berhasil ditambahkan.");
    }
};


// Mengambil semua berita
export const getSemuaBerita = async (): Promise<Berita[]> => {
  const q = query(beritaCollection, orderBy('tanggalPublikasi', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    tanggalPublikasi: doc.data().tanggalPublikasi,
  } as Berita));
};

// Mengambil beberapa berita terbaru
export const getBeritaTerbaru = async (jumlah: number, excludeId?: string): Promise<Berita[]> => {
    let beritaQuery = query(beritaCollection, orderBy('tanggalPublikasi', 'desc'));
    
    const snapshot = await getDocs(beritaQuery);
    
    let results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Berita));

    if(excludeId) {
        results = results.filter(berita => berita.id !== excludeId);
    }

    return results.slice(0, jumlah);
};


// Mengambil satu berita berdasarkan ID
export const getBeritaById = async (id: string): Promise<Berita | null> => {
  const docRef = doc(db, 'berita', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Berita;
  }
  return null;
};

// Menambah berita baru
export const tambahBerita = async (berita: BeritaTulis) => {
  let urlToSave = berita.gambarUrl || '';

  if (berita.gambar) {
    const storageRef = ref(storage, `berita/${Date.now()}_${berita.gambar.name}`);
    await uploadBytes(storageRef, berita.gambar);
    urlToSave = await getDownloadURL(storageRef);
  } else if (!urlToSave) {
    throw new Error("Gambar berita harus disediakan.");
  }
  
  return await addDoc(beritaCollection, {
    judul: berita.judul,
    isi: berita.isi,
    gambarUrl: urlToSave,
    tanggalPublikasi: serverTimestamp(),
  });
};

const deleteOldImage = async (imageUrl?: string | null) => {
    if (imageUrl && imageUrl.includes('firebasestorage')) {
        try {
            const oldImageRef = ref(storage, imageUrl);
            await deleteObject(oldImageRef);
        } catch (error: any) {
            if (error.code !== 'storage/object-not-found') {
                console.error("Gagal menghapus gambar lama:", error);
            }
        }
    }
};


// Memperbarui berita
export const updateBerita = async (id: string, berita: BeritaTulis, gambarUrlLama?: string | null) => {
  const docRef = doc(db, 'berita', id);
  let urlToSave = gambarUrlLama; // Start with the old URL

  // Case 1: New file is uploaded.
  if (berita.gambar) {
    // Delete the old image from storage, regardless of whether it was a URL or upload
    await deleteOldImage(gambarUrlLama);
    
    // Upload the new image
    const storageRef = ref(storage, `berita/${Date.now()}_${berita.gambar.name}`);
    await uploadBytes(storageRef, berita.gambar);
    urlToSave = await getDownloadURL(storageRef);
  } 
  // Case 2: New URL is provided.
  else if (berita.gambarUrl) {
    // If the new URL is different from the old one, delete the old one if it was a storage object.
    if (berita.gambarUrl !== gambarUrlLama) {
        await deleteOldImage(gambarUrlLama);
    }
    urlToSave = berita.gambarUrl;
  }

  const dataToUpdate: any = {
    judul: berita.judul,
    isi: berita.isi,
    gambarUrl: urlToSave,
    // tanggalPublikasi is not updated here to preserve original date, but you could add it if needed.
  };

  return await updateDoc(docRef, dataToUpdate);
};

// Menghapus berita
export const hapusBerita = async (id: string) => {
  const docRef = doc(db, 'berita', id);
  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().gambarUrl) {
     await deleteOldImage(docSnap.data().gambarUrl);
  }

  return await deleteDoc(docRef);
};
