// pages/pembayaran.tsx

'use client'; // Tandai komponen sebagai komponen klien

import Header from '../header';
import Footer from '../footer';

import { useState } from 'react'; // Import useState setelah 'use client'
import { db, storage } from '../db/firebase'; // Sesuaikan path berdasarkan struktur proyek Anda
import { collection, addDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Pembayaran = () => {
  const [name, setName] = useState('');
  const [bulan, setBulan] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [id, setId] = useState<string>(''); // Deklarasikan variabel id dengan useState

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.size > 500 * 1024) {
      setFileError('Ukuran file maksimal 500 KB');
      setFile(null);
    } else {
      setFileError(null);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileError && file) {
      try {
        // Tambahkan pengguna ke Firestore
        const userDocRef = await addDoc(collection(db, 'Users'), {
          name,
          email: 'example@example.com' // Gantikan dengan email yang sebenarnya jika diperlukan
        });

        // Set nilai id dari userDocRef
        setId(userDocRef.id);

        // Unggah file ke Firebase Storage
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const filePath = await getDownloadURL(storageRef);

        // Tambahkan metadata file ke Firestore
        const fileDocRef = await addDoc(collection(db, 'Files'), {
          file_name: file.name,
          file_size: file.size,
          file_path: filePath
        });

        // Tambahkan pembayaran ke Firestore
        await addDoc(collection(db, 'Payments'), {
          user_id: doc(db, 'Users', id),
          bulan,
          date,
          file_id: doc(db, 'Files', fileDocRef.id)
        });

        console.log('Pembayaran berhasil direkam');
      } catch (error) {
        console.error('Error menambahkan pembayaran: ', error);
      }
    }
  };

  return (
    <div>
 
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bulan" className="block text-sm font-medium text-gray-700">
              Bulan Pembayaran
            </label>
            <input
              type="text"
              id="bulan"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal Bayar</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Pilih File (Maks. 500 KB)
            </label>
            <input
              type="file"
              id="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleFileChange}
            />
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!file || !!fileError}
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Pembayaran;
