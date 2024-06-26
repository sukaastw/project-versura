// app/components/AnalyticsComponent.tsx

import { useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';

const AnalyticsComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const analytics = getAnalytics();
      // Lakukan pelacakan atau logika analytics yang diperlukan di sini
    }
  }, []);

  return null; // Komponen ini hanya melakukan inisialisasi, tidak perlu render apa pun
};

export default AnalyticsComponent;
