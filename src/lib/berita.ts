
import { db, storage } from './firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, Timestamp, query, orderBy, where, serverTimestamp, writeBatch, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export interface Berita {
  id: string;
  judul: string;
  isi: any; // Can be a string or Editor.js data
  gambarUrl: string;
  tanggalPublikasi: Timestamp;
}

export interface BeritaClient {
    id: string;
    judul: string;
    isi: any;
    gambarUrl: string;
    tanggalPublikasi: string; // Already string for client safety
}

// This interface is for writing data to Firestore
export interface BeritaTulis {
  judul: string;
  isi: any; // Editor.js data object
  gambarUrl?: string | null; // This can be a direct URL from input
  gambar?: File | null; // This is for file upload
}

const beritaCollection = collection(db, 'berita');

const seedBerita = async () => {
    const snapshot = await getDocs(query(beritaCollection));
    if (snapshot.empty) {
        console.log("Koleksi 'berita' kosong, menambahkan data mock...");
        const batch = writeBatch(db);
        const mockBerita = [
            {
                judul: "Musyawarah Desa Membahas Pembangunan Infrastruktur",
                isi: {
                    "time": 1629896400000,
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Warga desa antusias mengikuti musyawarah untuk rencana pembangunan jalan dan irigasi baru. Musyawarah ini dihadiri oleh kepala desa, perangkat desa, dan perwakilan warga dari setiap RW. Keputusan bersama diambil untuk memprioritaskan perbaikan jalan utama desa yang sudah rusak parah."
                            }
                        }
                    ],
                    "version": "2.22.2"
                },
                gambarUrl: "https://images.unsplash.com/photo-1649836751538-f377a2b20884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtdXN5YXdhcmFoJTIwZGVzYXxlbnwwfHx8fDE3NTU2MTUxODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
            },
            {
                judul: "Pelatihan UMKM Digital untuk Ibu-Ibu PKK",
                isi: {
                    "time": 1629896400000,
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Inisiatif baru untuk meningkatkan keterampilan digital dan pemasaran online bagi para pelaku UMKM di desa. Pelatihan ini mencakup materi tentang penggunaan media sosial untuk promosi, dasar-dasar fotografi produk, dan cara menggunakan platform e-commerce untuk menjangkau pasar yang lebih luas."
                            }
                        }
                    ],
                    "version": "2.22.2"
                },
                gambarUrl: "https://images.unsplash.com/photo-1602827114685-efbb2717da9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZWxhdGloYW4lMjBkaWdpdGFsJTIwJTIwfGVufDB8fHx8MTc1NTYxNTA3NHww&ixlib=rb-4.1.0&q=80&w=1080",
            },
            {
                judul: "Kerja Bakti Membersihkan Lingkungan Desa",
                isi: {
                    "time": 1629896400000,
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Semangat gotong royong warga dalam menjaga kebersihan dan keindahan lingkungan desa. Kegiatan ini rutin diadakan setiap hari Jumat pagi, menyasar area-area publik seperti taman desa, selokan, dan tepi jalan. Partisipasi warga sangat tinggi, menunjukkan kepedulian terhadap lingkungan."
                            }
                        }
                    ],
                    "version": "2.22.2"
                },
                gambarUrl: "https://images.unsplash.com/photo-1599839958882-748924f70a2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxrZXJqYSUyMGJha3RpfGVufDB8fHx8MTc1NTYxNTExOXww&ixlib=rb-4.1.0&q=80&w=1080",
            },
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
  await seedBerita(); // Panggil fungsi seeding
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
  }
  
  return await addDoc(beritaCollection, {
    judul: berita.judul,
    isi: berita.isi,
    gambarUrl: urlToSave,
    tanggalPublikasi: serverTimestamp(),
  });
};

// Memperbarui berita
export const updateBerita = async (id: string, berita: BeritaTulis, gambarUrlLama?: string) => {
  const docRef = doc(db, 'berita', id);
  let urlToSave = berita.gambarUrl;

  // Jika ada file gambar baru yang di-upload
  if (berita.gambar) {
    // Hapus gambar lama jika ada dan jika itu dari Firebase Storage
    if (gambarUrlLama && gambarUrlLama.includes('firebasestorage')) {
      try {
        const oldImageRef = ref(storage, gambarUrlLama);
        await deleteObject(oldImageRef);
      } catch (error: any) {
        if (error.code !== 'storage/object-not-found') {
          console.error("Gagal menghapus gambar lama:", error);
        }
      }
    }
    
    // Upload gambar baru
    const storageRef = ref(storage, `berita/${Date.now()}_${berita.gambar.name}`);
    await uploadBytes(storageRef, berita.gambar);
    urlToSave = await getDownloadURL(storageRef);
  } else if(berita.gambarUrl === '' && gambarUrlLama && gambarUrlLama.includes('firebasestorage')) {
     // Case where the URL is cleared, and we need to delete the old storage image
     try {
        const oldImageRef = ref(storage, gambarUrlLama);
        await deleteObject(oldImageRef);
      } catch (error: any) {
        if (error.code !== 'storage/object-not-found') {
          console.error("Gagal menghapus gambar lama:", error);
        }
      }
  }

  const dataToUpdate: any = {
    judul: berita.judul,
    isi: berita.isi,
    tanggalPublikasi: serverTimestamp(), // Keep timestamp updated
  };

  // Only update gambarUrl if it's explicitly provided (as a new URL or after upload)
  if (urlToSave !== undefined) {
      dataToUpdate.gambarUrl = urlToSave;
  }

  return await updateDoc(docRef, dataToUpdate);
};

// Menghapus berita
export const hapusBerita = async (id: string) => {
  const docRef = doc(db, 'berita', id);
  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().gambarUrl) {
     try {
        // Cek apakah URL dari Firebase Storage
        if (docSnap.data().gambarUrl.includes('firebasestorage.googleapis.com')) {
          const imageRef = ref(storage, docSnap.data().gambarUrl);
          await deleteObject(imageRef);
        }
      } catch (error: any) {
        if (error.code !== 'storage/object-not-found') {
          console.error("Gagal menghapus gambar:", error);
        }
      }
  }

  return await deleteDoc(docRef);
};

    
