
'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface DataIDM {
  id?: string;
  ike: number;
  iks: number;
  ikl: number;
  idm: number;
  status: string;
}

const docRef = doc(db, 'dataDesa', 'idm');

const calculateIDM = (data: Omit<DataIDM, 'idm' | 'status' | 'id'>): Pick<DataIDM, 'idm' | 'status'> => {
  const idmScore = (data.ike + data.iks + data.ikl) / 3;
  let status = "Sangat Tertinggal";
  if (idmScore > 0.8155) {
    status = "Mandiri";
  } else if (idmScore > 0.7072) {
    status = "Maju";
  } else if (idmScore > 0.5989) {
    status = "Berkembang";
  } else if (idmScore > 0.4907) {
    status = "Tertinggal";
  }
  return {
    idm: parseFloat(idmScore.toFixed(4)),
    status: status
  };
};

export const getDataIDM = async (): Promise<DataIDM> => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as DataIDM;
  }
  
  const defaultData: Omit<DataIDM, 'id' | 'idm' | 'status'> = {
    ike: 0.75, // Indeks Ketahanan Ekonomi
    iks: 0.82, // Indeks Ketahanan Sosial
    ikl: 0.65, // Indeks Ketahanan Lingkungan
  };
  
  const calculated = calculateIDM(defaultData);

  const fullDefaultData: DataIDM = {
    ...defaultData,
    ...calculated
  };

  await setDoc(docRef, fullDefaultData);
  
  return { id: 'idm', ...fullDefaultData };
};

export const updateDataIDM = async (data: Omit<DataIDM, 'id' | 'idm' | 'status'>) => {
    const calculated = calculateIDM(data);
    const dataToUpdate = { ...data, ...calculated };
    await setDoc(docRef, dataToUpdate, { merge: true });
};
