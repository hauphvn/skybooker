// src/features/flights/components/FlightCard.tsx
'use client';

import  { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, ChevronDown, ChevronUp, Luggage, Clock, ShieldAlert } from 'lucide-react';
import { FlightOfferUI } from '../domain/flight.types';
import { useBookingStore } from '@/features/booking/store/booking.store';

interface FlightCardProps {
  flight: FlightOfferUI;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const selectFlight = useBookingStore((state) => state.selectFlight);

  const handleBooking = () => {
    selectFlight(flight.id);
    router.push('/booking/checkout');
  };

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(flight.totalPrice);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-md transition-all">
      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Airline Brand Info */}
          <div className="flex items-center gap-3.5 min-w-[200px]">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-blue-700 text-sm tracking-wider">
              {flight.airlineCode}
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-snug">{flight.airlineName}</div>
              <div className="text-xs text-slate-400 font-medium">
                {flight.flightNumber} • {flight.segments[0]?.aircraftModel}
              </div>
            </div>
          </div>

          {/* Schedule Route */}
          <div className="flex items-center justify-between md:justify-center gap-6 md:gap-10 flex-1">
            <div className="text-left md:text-center">
              <div className="text-xl font-black text-slate-900 tracking-tight font-mono">
                {flight.departureTime}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">{flight.originIata}</div>
            </div>

            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <span className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {flight.totalDuration}
              </span>
              <div className="w-full h-0.5 bg-slate-200 relative flex items-center justify-center">
                <Plane className="w-3.5 h-3.5 text-blue-600 bg-white px-0.5" />
              </div>
              <span
                className={`text-[11px] font-bold mt-1 ${
                  flight.isDirect ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {flight.isDirect ? 'Bay thẳng' : `${flight.stopCount} điểm dừng`}
              </span>
            </div>

            <div className="text-right md:text-center">
              <div className="text-xl font-black text-slate-900 tracking-tight font-mono">
                {flight.arrivalTime}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">{flight.destinationIata}</div>
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 gap-2 min-w-[160px]">
            <div className="text-left md:text-right">
              <span className="text-[11px] text-slate-400 font-medium block">Giá / khách</span>
              <div className="text-2xl font-black text-orange-500 leading-tight">
                {formattedPrice} <span className="text-sm font-semibold text-orange-400">₫</span>
              </div>
            </div>
            <button
              onClick={handleBooking}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              Chọn vé
            </button>
          </div>
        </div>

        {/* Ancillary & Toggle Detail Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Luggage className="w-3.5 h-3.5 text-slate-400" />
              {flight.hasCheckedBaggage ? 'Đã bao gồm ký gửi 20kg' : 'Chỉ có 7kg xách tay'}
            </span>
            {flight.availableSeats <= 4 && (
              <span className="text-rose-500 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Còn {flight.availableSeats} ghế giá này
              </span>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors"
          >
            {isExpanded ? 'Đóng chi tiết' : 'Chi tiết hành trình'}
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Segment Drawer */}
      {isExpanded && (
        <div className="bg-slate-50/80 border-t border-slate-200/80 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Chi tiết các chặng bay (Segments)
          </div>

          {flight.segments.map((seg, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-700">
                  Chặng {idx + 1}: {seg.departure.airportName} ({seg.departure.airportCode}) $\rightarrow${' '}
                  {seg.arrival.airportName} ({seg.arrival.airportCode})
                </span>
                <span>{seg.aircraftModel}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Cất cánh:</span>
                  <span className="font-bold text-slate-800 text-sm">{seg.departure.time}</span> -{' '}
                  <span className="text-slate-600">{seg.departure.date}</span>
                  <p className="text-slate-500 mt-0.5">Ga đi: Terminal {seg.departure.terminal || 'T1'}</p>
                </div>
                <div>
                  <span className="text-slate-400 block">Hạ cánh:</span>
                  <span className="font-bold text-slate-800 text-sm">{seg.arrival.time}</span> -{' '}
                  <span className="text-slate-600">{seg.arrival.date}</span>
                  <p className="text-slate-500 mt-0.5">Ga đến: Terminal {seg.arrival.terminal || 'T2'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
