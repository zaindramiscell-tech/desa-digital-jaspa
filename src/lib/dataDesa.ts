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
export const getDataDemografi = async (): Promise<DataDemografi | null> => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as DataDemografi;
  }
  // Mengembalikan data default jika tidak ada di database
  return {
    totalPenduduk: 0,
    jumlahPria: 0,
    jumlahWanita: 0,
    jumlahKK: 0,
    komposisiUsia: {
        "0-17": 0,
        "18-55": 0,
        "55+": 0,
    }
  };
};

// Memperbarui data demografi
export const updateDataDemografi = async (data: Partial<DataDemografi>) => {
    // Menggunakan setDoc dengan { merge: true } untuk membuat atau memperbarui dokumen.
    await setDoc(docRef, data, { merge: true });
};
