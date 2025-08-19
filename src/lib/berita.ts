import { db, storage } from './firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, Timestamp, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export interface Berita {
  id: string;
  judul: string;
  isi: string;
  gambarUrl: string;
  tanggalPublikasi: Timestamp;
}

export interface BeritaTulis {
  judul: string;
  isi: string;
  gambar?: File;
  gambarUrl?: string;
}


const beritaCollection = collection(db, 'berita');

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
  let gambarUrl = berita.gambarUrl || '';
  if (berita.gambar) {
    const storageRef = ref(storage, `berita/${Date.now()}_${berita.gambar.name}`);
    await uploadBytes(storageRef, berita.gambar);
    gambarUrl = await getDownloadURL(storageRef);
  }
  
  return await addDoc(beritaCollection, {
    judul: berita.judul,
    isi: berita.isi,
    gambarUrl: gambarUrl,
    tanggalPublikasi: serverTimestamp(),
  });
};

// Memperbarui berita
export const updateBerita = async (id: string, berita: BeritaTulis) => {
  const docRef = doc(db, 'berita', id);
  let gambarUrl = berita.gambarUrl || '';

  if (berita.gambar) {
    // Optional: Delete old image from storage if you want
    const currentDoc = await getDoc(docRef);
    if(currentDoc.exists() && currentDoc.data().gambarUrl) {
      try {
        const oldImageRef = ref(storage, currentDoc.data().gambarUrl);
        await deleteObject(oldImageRef);
      } catch (error: any) {
        if (error.code !== 'storage/object-not-found') {
          console.error("Gagal menghapus gambar lama:", error);
        }
      }
    }
    
    // Upload new image
    const storageRef = ref(storage, `berita/${Date.now()}_${berita.gambar.name}`);
    await uploadBytes(storageRef, berita.gambar);
    gambarUrl = await getDownloadURL(storageRef);
  }

  const dataToUpdate: any = {
    judul: berita.judul,
    isi: berita.isi,
  };

  if(gambarUrl) {
    dataToUpdate.gambarUrl = gambarUrl;
  }

  return await updateDoc(docRef, dataToUpdate);
};

// Menghapus berita
export const hapusBerita = async (id: string) => {
  const docRef = doc(db, 'berita', id);
  
  // Delete image from storage first
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().gambarUrl) {
     try {
        const imageRef = ref(storage, docSnap.data().gambarUrl);
        await deleteObject(imageRef);
      } catch (error: any) {
        if (error.code !== 'storage/object-not-found') {
          console.error("Gagal menghapus gambar:", error);
        }
      }
  }

  // Then delete the document
  return await deleteDoc(docRef);
};
