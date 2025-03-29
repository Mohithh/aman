'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSignInAlt } from "react-icons/fa";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">


          <div className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Mohit</span>
          </div>

        
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">Home</Link>
            <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">About</Link>
            <Link href="/services" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">Services</Link>
            <Link href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">Contact</Link>
            <Link href="/Login" className="text-gray-800 dark:text-gray-200 hover:text-blue-500"><FaSignInAlt />
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-gray-200">
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden space-y-2 p-4 bg-white dark:bg-gray-900 shadow-lg">
          <Link href="/" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">Home</Link>
          <Link href="/about" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">About</Link>
          <Link href="/services" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">Services</Link>
          <Link href="/contact" className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">Contact</Link>
        </div>
      )}
    </nav>
  );
}
