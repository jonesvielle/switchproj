import Image from "next/image";
import { Globe, HeadphonesIcon, Menu } from "lucide-react";
import Logo from "@/public/images/int.png";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-quickblue via-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a
              href="https://quickteller.com"
              className="flex items-center space-x-4 group"
            >
              <Image
                src={Logo}
                alt="Quickteller Logo"
                width={100}
                height={70}
                priority
                className="transition-transform group-hover:scale-105"
              />
              <div className="hidden lg:block">
                <p className="text-xs font-light tracking-wider uppercase opacity-80">
                  Powered by
                </p>
                <p className="text-lg font-bold tracking-wide">Interswitch</p>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a
              href="https://quickteller.com"
              className="hover:text-cyan-200 transition flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Quickteller.com
            </a>

            <a
              href="mailto:support@quickteller.com"
              className="hover:text-cyan-200 transition flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full backdrop-blur-sm hover:bg-white/20"
            >
              <HeadphonesIcon className="w-4 h-4" />
              Get Support
            </a>

            <a
              href="https://wa.me/2348108135505"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-lg flex items-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"></div>
    </header>
  );
}
