
'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  role: 'admin' | 'user';
}

// Fungsi untuk membuat profil pengguna saat registrasi
export const createUserProfile = async (uid: string, email: string | null) => {
  const userRef = doc(db, 'users', uid);
  // By default, a new user is an admin.
  // In a real application, you would want to change this to 'user'
  // and have a separate process for granting admin rights.
  const newUserProfile: Omit<UserProfile, 'uid'> = {
    email: email,
    role: 'admin', 
  };
  await setDoc(userRef, newUserProfile);
};

// Fungsi untuk mendapatkan profil pengguna (termasuk peran)
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return { uid, ...docSnap.data() } as UserProfile;
  }
  return null;
};
