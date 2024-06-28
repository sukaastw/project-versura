import admin from 'firebase-admin';
import serviceAccount from './path/to/your/serviceAccountKey.json'; // Ganti dengan path ke service account key Anda

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'your-bucket-name.appspot.com' // Ganti dengan nama bucket Anda
  });
}

const bucket = admin.storage().bucket();

const setCorsConfiguration = async () => {
  const corsConfiguration = [
    {
      "origin": ["http://localhost:3000"], // Ganti dengan origin yang diizinkan
      "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      "responseHeader": ["Content-Type", "Authorization"],
      "maxAgeSeconds": 3600
    }
  ];

  await bucket.setCorsConfiguration(corsConfiguration);
  console.log('CORS configuration set successfully');
};

export { setCorsConfiguration };