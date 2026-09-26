import React from 'react';
import { Phone, MapPin, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface MobileActionBarProps {
  onOpenBooking: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#222222]/10 py-2.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        
        {/* CALL */}
        <a
          href={`tel:${SALON_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FFFFFF] border border-[#222222]/10 text-[#222222] active:bg-[#F3EFE8] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#C9A96A] mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">CALL</span>
        </a>

        {/* MAP */}
        <a
          href={SALON_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FFFFFF] border border-[#222222]/10 text-[#222222] active:bg-[#F3EFE8] transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#C9A96A] mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">MAP</span>
        </a>

        {/* BOOK */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#222222] text-[#FAF9F6] active:bg-[#C9A96A] active:text-[#222222] transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#C9A96A] mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">BOOK</span>
        </button>

      </div>
    </div>
  );
};
