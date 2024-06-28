// firebase.js (atau firebase.ts)
import { db } from './firebaseClient'; // Sesuaikan path dengan lokasi file firebaseClient.js
import { collection, addDoc } from 'firebase/firestore';

const addPost = async (formData) => {
    try {
        const collectionRef = collection(db, 'post');
        
        // Menambahkan dokumen baru ke koleksi 'post'
        await addDoc(collectionRef, {
            title: formData.id, // Menggunakan formData.id untuk judul post, sesuaikan dengan struktur formData yang Anda miliki
            //Tambahkan properti lain jika perlu
        });

        console.log('Post successfully added!');
    } catch (error) {
        console.error('Error adding post: ', error);
    }
};

export { addPost };