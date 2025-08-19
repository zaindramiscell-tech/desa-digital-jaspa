
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
                            "type": "header",
                            "data": {
                                "text": "Keputusan Bersama untuk Kemajuan Desa",
                                "level": 2
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Warga desa antusias mengikuti musyawarah untuk rencana pembangunan jalan dan irigasi baru. Musyawarah ini dihadiri oleh kepala desa, perangkat desa, dan perwakilan warga dari setiap RW. Keputusan bersama diambil untuk memprioritaskan perbaikan jalan utama desa yang sudah rusak parah."
                            }
                        }
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1649836751538-f377a2b20884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtdXN5YXdhcmFoJTIwZGVzYXxlbnwwfHx8fDE3NTU2MTUxODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
            },
            {
                judul: "Pelatihan UMKM Digital untuk Ibu-Ibu PKK",
                isi: {
                    "time": 1629896400000,
                    "blocks": [
                         {
                            "type": "header",
                            "data": {
                                "text": "Mendorong Ekonomi Kreatif Desa",
                                "level": 2
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Inisiatif baru untuk meningkatkan keterampilan digital dan pemasaran online bagi para pelaku UMKM di desa. Pelatihan ini mencakup materi tentang penggunaan media sosial untuk promosi, dasar-dasar fotografi produk, dan cara menggunakan platform e-commerce untuk menjangkau pasar yang lebih luas."
                            }
                        }
                    ],
                    "version": "2.29.1"
                },
                gambarUrl: "https://images.unsplash.com/photo-1602827114685-efbb2717da9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZWxhdGloYW4lMjBkaWdpdGFsJTIwJTIwfGVufDB8fHx8MTc1NTYxNTA3NHww&ixlib=rb-4.1.0&q=80&w=1080",
            },
            {
                judul: "Kerja Bakti Membersihkan Lingkungan Desa",
                isi: {
                    "time": 1629896400000,
                    "blocks": [
                        {
                            "type": "header",
                            "data": {
                                "text": "Gotong Royong Jaga Kebersihan",
                                "level": 2
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Semangat gotong royong warga dalam menjaga kebersihan dan keindahan lingkungan desa. Kegiatan ini rutin diadakan setiap hari Jumat pagi, menyasar area-area publik seperti taman desa, selokan, dan tepi jalan. Partisipasi warga sangat tinggi, menunjukkan kepedulian terhadap lingkungan."
                            }
                        }
                    ],
                    "version": "2.29.1"
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
