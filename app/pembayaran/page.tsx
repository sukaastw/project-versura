import Form from './pembayaran';

export const metadata = {
  title: "Beranda",
  description: "General by create app",
}

const PembayaranPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Form />
    </div>
  );
};

export default PembayaranPage;
