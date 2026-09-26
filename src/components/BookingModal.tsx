import React from 'react';
import { X, Phone, MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#222222]/10 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3EFE8] hover:bg-[#E8E2D8] flex items-center justify-center text-[#222222] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A96A] font-semibold">
          Get in Touch
        </span>

        <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#222222] mt-1 mb-2">
          BOOK YOUR VISIT
        </h3>

        <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed mb-6">
          To give each guest personal time and attention, appointments and walk-in confirmations are handled directly by our front desk.
        </p>

        {/* Primary Call Action */}
        <div className="space-y-3 mb-6">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#222222] text-[#FAF9F6] hover:bg-[#C9A96A] hover:text-[#222222] transition-all duration-300 shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A96A] group-hover:text-[#222222]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#FAF9F6]/70 group-hover:text-[#222222]/70 block font-medium">
                  Tap to Call Front Desk
                </span>
                <span className="text-sm font-semibold">{SALON_INFO.phone}</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#C9A96A] group-hover:text-[#222222]" />
          </a>

          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#FFFFFF] border border-[#222222]/10 hover:border-[#222222] text-[#222222] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F3EFE8] flex items-center justify-center text-[#C9A96A]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#777777] block font-medium">
                  Directions &amp; Navigation
                </span>
                <span className="text-xs font-semibold">Open Google Maps</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#222222]" />
          </a>
        </div>

        {/* Info Highlights */}
        <div className="p-3.5 rounded-2xl bg-[#F3EFE8]/70 border border-[#222222]/5 text-xs text-[#555555] space-y-1.5 font-light">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Open daily: 10:00 AM – 9:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>1st Floor, Shop 106, Vrundavan Trade Center, Kudasan</span>
          </div>
        </div>

      </div>
    </div>
  );
};
