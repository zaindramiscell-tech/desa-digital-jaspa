'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface Kontak {
    alamat: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    telepon: string;
    email: string;
}

export interface Setelan {
  id?: string;
  namaDesa: string;
  deskripsiSitus: string;
  kontak: Kontak;
}

const docRef = doc(db, 'setelan', 'website');

// Mengambil data setelan website
export const getSetelan = async (): Promise<Setelan> => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Setelan;
  }
  
  // Data default jika tidak ada di database
  const defaultData: Setelan = {
    namaDesa: "Desa Digital",
    deskripsiSitus: "Platform informasi desa yang modern, informatif, dan mudah dikelola.",
    kontak: {
        alamat: "Jl. Raya Desa No. 1",
        kecamatan: "Kec. Digital",
        kabupaten: "Kab. Cerdas",
        provinsi: "Prov. Teknologi",
        telepon: "(021) 123-4567",
        email: "kontak@desadigital.id"
    }
  };

  // Simpan data default ke Firestore jika dokumen belum ada
  await setDoc(docRef, defaultData);
  
  return { id: 'website', ...defaultData };
};

// Memperbarui data setelan website
export const updateSetelan = async (data: Partial<Setelan>) => {
    await setDoc(docRef, data, { merge: true });
};
