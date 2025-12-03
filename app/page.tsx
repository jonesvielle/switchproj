// app/page.tsx
import ReservationForm from "../components/ReservationForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-quickblue mb-4">
            Claim Your Quickteller Number
          </h1>
          <p className="text-lg text-gray-700">
            Join thousands of businesses already powering payments with
            Quickteller. Secure your number before it’s gone!
          </p>
        </div>

        <ReservationForm />
      </main>

      <Footer />
    </>
  );
}
