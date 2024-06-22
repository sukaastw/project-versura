"use client";

import { useState } from 'react';
import Header from '../header';
import Footer from '../footer';

const Pembayaran = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [bulan, setBulan] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileError) {
      console.log({ name, id, bulan, date, file });
    }
  };

  return (
    <div>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bulan" className="block text-sm font-medium text-gray-700">Bulan</label>
            <input
              type="text"
              id="bulan"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
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
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Bukti Bayar <span className="text-gray-500">(Maksimal 500 KB)</span></label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kirim
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Pembayaran;
