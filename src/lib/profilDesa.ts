'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface ProfilDesaData {
  id?: string;
  sejarah: string;
  visi: string;
  misi: string[];
}

const docRef = doc(db, 'profilDesa', 'konten');

// Mengambil data profil desa
export const getProfilDesa = async (): Promise<ProfilDesaData> => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProfilDesaData;
  }
  
  // Data default jika tidak ada di database
  const defaultData: ProfilDesaData = {
    sejarah: "Sejarah desa kami dimulai pada tahun Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
    visi: "Terwujudnya Desa yang Maju, Mandiri, Sejahtera, dan Berbasis Digital pada Tahun 2030.",
    misi: [
      "Meningkatkan kualitas pelayanan publik melalui digitalisasi.",
      "Mengembangkan potensi ekonomi lokal dengan dukungan teknologi.",
      "Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan.",
      "Membangun infrastruktur yang mendukung konektivitas dan kemajuan desa.",
      "Mendorong partisipasi aktif masyarakat dalam pembangunan desa.",
    ]
  };

  // Simpan data default ke Firestore jika dokumen belum ada
  await setDoc(docRef, defaultData);
  
  return { id: 'konten', ...defaultData };
};

// Memperbarui data profil desa
export const updateProfilDesa = async (data: Partial<ProfilDesaData>) => {
    await setDoc(docRef, data, { merge: true });
};
