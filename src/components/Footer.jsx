"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gdg from "../../public/gdg.svg"

export default function SpaceFooter() {


  return (
    <footer className="relative bg-gradient-to-b from-black via-black to-indigo-950 text-white px-6 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2026 GDG LNMIIT. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Designed & Developed by</span>
              <Image 
                src={gdg} 
                alt="GDG Logo" 
                width={24} 
                height={24}
                className="inline-block"
              />
              <span className="text-sm font-semibold text-white font-bold">
                GDG LNMIIT
              </span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}