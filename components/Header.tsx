"use client";
import Image from "next/image";
import { Globe, HeadphonesIcon, Menu, X } from "lucide-react";
import Logo from "@/public/images/int.png";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-quickblue via-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
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
                className="transition-transform group-hover:scale-105 w-20 sm:w-24 md:w-28"
              />
              <div className="hidden lg:block">
                <p className="text-xs font-light tracking-wider uppercase opacity-80">
                  Powered by
                </p>
                <p className="text-lg font-bold tracking-wide">Interswitch</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
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

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"></div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-gradient-to-b from-quickblue to-indigo-900 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <Image
                src={Logo}
                alt="Quickteller"
                width={90}
                height={60}
                priority
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-6 space-y-5 text-lg">
              <a
                href="https://quickteller.com"
                className="block py-3 hover:text-cyan-200 transition flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <Globe className="w-5 h-5" />
                Quickteller.com
              </a>
              <a
                href="mailto:support@quickteller.com"
                className="block py-3 hover:text-cyan-200 transition flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <HeadphonesIcon className="w-5 h-5" />
                Get Support
              </a>
              <a
                href="https://wa.me/2348108135505"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-4 bg-green-500 hover:bg-green-600 text-white rounded-full text-center font-semibold transition shadow-lg flex items-center justify-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                Chat on WhatsApp
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
