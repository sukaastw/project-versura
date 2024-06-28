'use client';
import { useState } from 'react';
import { db, storage } from '../db/firebase'; // Pastikan db adalah referensi Firestore, bukan Database
import { collection, addDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Pembayaran = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    bulan: '',
    date: '',
    file: null as File | null, // Memastikan file memiliki tipe File atau null
    fileError: null as string | null, // Memastikan fileError memiliki tipe string atau null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.size > 500 * 1024) {
      setFormData({
        ...formData,
        fileError: 'Ukuran file maksimal 500 KB',
        file: null,
      });
      alert('Ukuran file maksimal 500 KB');
    } else {
      setFormData({
        ...formData,
        fileError: null,
        file: selectedFile,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, id, bulan, date, file, fileError } = formData;

    if (!fileError && file) {
      try {
        // Tambahkan pengguna ke Firestore
        const userDocRef = await addDoc(collection(db, 'Users'), {
          name,
          id,
          email: 'example@example.com',
        });

        // Set nilai id dari userDocRef
        const userId = userDocRef.id;

        // Upload file ke Firebase Storage
        const storageRef = ref(storage, `payments/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);

        // Dapatkan URL download dari file yang diunggah
        const fileDownloadURL = await getDownloadURL(storageRef);

        // Tambahkan pembayaran ke Firestore dengan referensi ke file di Storage
        await addDoc(collection(db, 'Payments'), {
          user_id: doc(db, 'Users', userId),
          bulan,
          date,
          file_name: file.name,
          file_size: file.size,
          file_url: fileDownloadURL,
        });

        console.log('Pembayaran berhasil direkam');

        // Berikan notifikasi
        alert('Pembayaran berhasil direkam');

        // Reset formulir setelah transaksi berhasil
        setFormData({
          name: '',
          id: '',
          bulan: '',
          date: '',
          file: null,
          fileError: null,
        });

      } catch (error) {
        console.error('Error menambahkan pembayaran: ', error);
        // Tambahkan penanganan error sesuai kebutuhan aplikasi Anda
      }
    }
  };

  return (
    <div>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-black"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-black"
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bulan" className="block text-sm font-medium text-gray-700">
              Bulan Pembayaran
            </label>
            <input
              type="text"
              id="bulan"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-black"
              value={formData.bulan}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Tanggal Bayar
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-black"
              onChange={handleFileChange}
            />
            {formData.fileError && <p className="text-red-500 text-sm mt-1">{formData.fileError}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!formData.file || !!formData.fileError}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Pembayaran;
