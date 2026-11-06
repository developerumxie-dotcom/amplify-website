import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ClientLogoBar() {
  return (
    <section className="relative py-8 sm:py-12 z-10">
      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="w-full rounded-2xl sm:rounded-full bg-[#0D0922]/80 border border-white/12 backdrop-blur-xl px-8 sm:px-12 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          
          {/* Left Label */}
          <div className="flex items-center gap-4 shrink-0 pr-0 md:pr-8 md:border-r border-white/12 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm text-slate-400 font-normal">Trusted by</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">leading brands</span>
            </div>
          </div>

          {/* Logos Row */}
          <div className="flex-1 flex flex-wrap items-center justify-around gap-8 sm:gap-12 px-2 sm:px-6 opacity-90 hover:opacity-100 transition-opacity">
            {/* Google */}
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-medium tracking-tight text-white font-sans hover:text-white transition-colors">
                Google
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 15.5C9.5 15.5 8 13.5 8 11.5C8 9.5 9.5 8.5 11 8.5C12.5 8.5 13.5 9.5 14.5 11C15.5 9.5 16.5 8.5 18 8.5C19.5 8.5 21 9.5 21 11.5C21 13.5 19.5 15.5 17 15.5C15 15.5 13.5 14 12.5 12.5C11.5 14 10 15.5 12 15.5ZM12 12C13 10.5 14 9.5 15.5 9.5C17 9.5 18 10.5 18 11.8C18 13 17 14.2 15.8 14.2C14.2 14.2 13 13 12 12ZM7 11.8C7 10.5 8 9.5 9.5 9.5C10.5 9.5 11.5 10.5 12.2 11.5C11.5 12.8 10.2 14.2 8.8 14.2C7.5 14.2 7 13 7 11.8Z"/>
              </svg>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Meta
              </span>
            </div>

            {/* Amazon */}
            <div className="flex items-center">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white lowercase">
                amazon
              </span>
            </div>

            {/* TATA */}
            <div className="flex items-center">
              <span className="text-base sm:text-lg font-extrabold tracking-[0.22em] text-white">
                TATA
              </span>
            </div>

            {/* Microsoft */}
            <div className="flex items-center gap-2.5">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className="bg-[#F25022] rounded-[1px]" />
                <div className="bg-[#7FBA00] rounded-[1px]" />
                <div className="bg-[#00A4EF] rounded-[1px]" />
                <div className="bg-[#FFB900] rounded-[1px]" />
              </div>
              <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
                Microsoft
              </span>
            </div>

            {/* YouTube */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-red-600 rounded-[5px] flex items-center justify-center">
                <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[7px] border-l-white ml-0.5" />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                YouTube
              </span>
            </div>
          </div>

          {/* Right Chevron */}
          <div className="hidden md:flex items-center text-slate-400 pl-6 border-l border-white/12">
            <ChevronRight className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
          </div>

        </div>
      </div>
    </section>
  );
}
