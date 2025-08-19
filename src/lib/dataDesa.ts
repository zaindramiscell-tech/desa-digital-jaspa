'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface KomposisiUsia {
  [kelompok: string]: number;
}

export interface DataDemografi {
  id?: string;
  totalPenduduk: number;
  jumlahPria: number;
  jumlahWanita: number;
  jumlahKK: number;
  komposisiUsia: KomposisiUsia;
}

const docRef = doc(db, 'dataDesa', 'demografi');

// Mengambil data demografi
export const getDataDemografi = async (): Promise<DataDemografi> => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as DataDemografi;
  }
  
  // Data default jika tidak ada di database
  const defaultData: DataDemografi = {
    totalPenduduk: 2580,
    jumlahPria: 1250,
    jumlahWanita: 1330,
    jumlahKK: 750,
    komposisiUsia: {
        "0-17": 600,
        "18-55": 1500,
        "55+": 480,
    }
  };

  // Simpan data default ke Firestore jika dokumen belum ada
  await setDoc(docRef, defaultData);
  
  return { id: 'demografi', ...defaultData };
};

// Memperbarui data demografi
export const updateDataDemografi = async (data: Partial<DataDemografi>) => {
    // Menggunakan setDoc dengan { merge: true } untuk membuat atau memperbarui dokumen.
    await setDoc(docRef, data, { merge: true });
};
