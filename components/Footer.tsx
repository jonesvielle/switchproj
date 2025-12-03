export default function Footer() {
  return (
    <footer className="bg-quickblue text-white py-10">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Quickteller Business</h3>
          <p className="text-sm text-blue-100">
            The fastest way to accept payments, send money, and grow your
            business in Nigeria.
          </p>
        </div>

        <div className="text-sm">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-blue-100">
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p className="text-blue-100">
            Email: support@quickteller.com
            <br />
            Phone: 0700 906 5000
            <br />© 2025 Interswitch Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
