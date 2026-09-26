import React from 'react';
import { X, Phone, MapPin, Check, Sparkles } from 'lucide-react';
import { ServiceItem, SALON_INFO } from '../data/salonData';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#222222]/10 text-left animate-in zoom-in-95 duration-200"
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

        {/* Category & Number */}
        <div className="flex items-center gap-2 text-xs text-[#888888] mb-2">
          <span className="font-mono font-semibold text-[#C9A96A]">{service.number}</span>
          <span>·</span>
          <span className="uppercase tracking-widest text-[#777777] font-medium">
            {service.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#222222] mb-3">
          {service.name}
        </h3>

        {/* Summary Description */}
        <p className="text-sm text-[#444444] font-medium mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Extended Details */}
        <div className="p-4 rounded-2xl bg-[#F3EFE8]/70 border border-[#222222]/5 text-xs sm:text-[13px] text-[#555555] leading-relaxed mb-6 font-light">
          {service.details}
        </div>

        {/* Highlights */}
        {service.highlights && service.highlights.length > 0 && (
          <div className="space-y-2 mb-6">
            <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold block">
              What to Expect
            </span>
            <div className="grid grid-cols-1 gap-2">
              {service.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#333333]">
                  <div className="w-4 h-4 rounded-full bg-[#C9A96A]/20 flex items-center justify-center text-[#B59353] shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#222222] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A96A] hover:text-[#222222] transition-colors shadow-sm text-center"
          >
            <Phone className="w-4 h-4 text-[#C9A96A]" />
            <span>CALL TO BOOK</span>
          </a>

          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border border-[#222222]/20 hover:border-[#222222] bg-white text-[#222222] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#C9A96A]" />
            <span>VISIT SALON</span>
          </a>
        </div>

        {/* Friendly note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#888888] flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C9A96A]" />
            <span>Walk-ins welcome · Open daily until 9 PM</span>
          </p>
        </div>

      </div>
    </div>
  );
};
