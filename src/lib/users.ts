
'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  role: 'admin' | 'user';
}

export const seedAdminUser = async () => {
    const auth = getAuth();
    const email = 'dev@sidepe.com';
    const password = 'cobasaja';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(`Pengguna admin mock berhasil dibuat: ${userCredential.user.email}`);
        await createUserProfile(userCredential.user.uid, userCredential.user.email);
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('Pengguna admin mock sudah ada.');
        } else {
            console.error('Gagal membuat pengguna admin mock:', error);
            // Melempar kembali error agar bisa ditangkap oleh pemanggil
            throw new Error(`Gagal membuat pengguna admin mock: ${error.message}`);
        }
    }
};


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
