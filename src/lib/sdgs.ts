
'use server';

import { db } from './firebase/config';
import { doc, getDoc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';

export interface SDG {
  id: string; // e.g., "sdg-1"
  nama: string;
  deskripsi: string;
  skor: number; // 0-100
}

const sdgsCollectionRef = collection(db, 'sdgs');

const defaultSDGs: Omit<SDG, 'id'>[] = [
    { nama: "Desa Tanpa Kemiskinan", deskripsi: "Mengakhiri segala bentuk kemiskinan di desa.", skor: 85 },
    { nama: "Desa Tanpa Kelaparan", deskripsi: "Mengakhiri kelaparan, mencapai ketahanan pangan dan gizi.", skor: 92 },
    { nama: "Desa Sehat dan Sejahtera", deskripsi: "Menjamin kehidupan sehat dan mendorong kesejahteraan bagi semua.", skor: 78 },
    { nama: "Pendidikan Desa Berkualitas", deskripsi: "Menjamin kualitas pendidikan yang inklusif dan merata.", skor: 88 },
    { nama: "Keterlibatan Perempuan Desa", deskripsi: "Mencapai kesetaraan gender dan memberdayakan perempuan.", skor: 75 },
    { nama: "Desa Layak Air Bersih dan Sanitasi", deskripsi: "Menjamin ketersediaan air bersih dan sanitasi yang berkelanjutan.", skor: 95 },
    { nama: "Desa Berenergi Bersih dan Terbarukan", deskripsi: "Menjamin akses energi yang terjangkau, andal, dan modern.", skor: 60 },
    { nama: "Pekerjaan dan Pertumbuhan Ekonomi Desa", deskripsi: "Mendukung pertumbuhan ekonomi yang inklusif dan berkelanjutan.", skor: 82 },
    { nama: "Inovasi dan Infrastruktur Desa", deskripsi: "Membangun infrastruktur yang tangguh dan mendorong inovasi.", skor: 70 },
    { nama: "Desa Tanpa Kesenjangan", deskripsi: "Mengurangi kesenjangan di dalam dan antar desa.", skor: 65 },
    { nama: "Kawasan Permukiman Desa Aman dan Nyaman", deskripsi: "Menjadikan permukiman inklusif, aman, tangguh, dan berkelanjutan.", skor: 89 },
    { nama: "Konsumsi dan Produksi Desa yang Sadar Lingkungan", deskripsi: "Menjamin pola konsumsi dan produksi yang bertanggung jawab.", skor: 77 },
    { nama: "Desa Tanggap Perubahan Iklim", deskripsi: "Mengambil aksi segera untuk memerangi perubahan iklim dan dampaknya.", skor: 68 },
    { nama: "Desa Peduli Lingkungan Laut", deskripsi: "Melestarikan dan memanfaatkan samudra dan sumber daya laut.", skor: 72 },
    { nama: "Desa Peduli Lingkungan Darat", deskripsi: "Melindungi, merestorasi, dan mendorong pemanfaatan ekosistem darat.", skor: 81 },
    { nama: "Desa Damai Berkeadilan", deskripsi: "Mendorong masyarakat yang damai dan inklusif untuk pembangunan.", skor: 94 },
    { nama: "Kemitraan untuk Pembangunan Desa", deskripsi: "Menghidupkan kembali kemitraan global untuk pembangunan.", skor: 85 },
    { nama: "Kelembagaan Desa Dinamis dan Budaya Desa Adaptif", deskripsi: "Menguatkan kelembagaan dan melestarikan budaya.", skor: 90 },
];


export const seedSDGs = async () => {
    const snapshot = await getDocs(sdgsCollectionRef);
    if (snapshot.empty) {
        console.log("Koleksi 'sdgs' kosong, menambahkan data default...");
        const batch = writeBatch(db);
        defaultSDGs.forEach((sdg, index) => {
            const docRef = doc(sdgsCollectionRef, `sdg-${index + 1}`);
            batch.set(docRef, sdg);
        });
        await batch.commit();
        console.log("Data SDGs default berhasil ditambahkan.");
    }
}

export const getAllSDGs = async (): Promise<SDG[]> => {
    await seedSDGs();
    const snapshot = await getDocs(sdgsCollectionRef);
    return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as SDG))
        .sort((a, b) => {
            const numA = parseInt(a.id.split('-')[1]);
            const numB = parseInt(b.id.split('-')[1]);
            return numA - numB;
        });
};

export const updateSDGSkor = async (id: string, skor: number) => {
    const docRef = doc(db, 'sdgs', id);
    await setDoc(docRef, { skor }, { merge: true });
};
