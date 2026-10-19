// src/features/flights/components/PassengerCounter.tsx
'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Users, Plus, Minus } from 'lucide-react';

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerCounterProps {
  value: PassengerCounts;
  seatClass: string;
  onChange: (counts: PassengerCounts) => void;
  onSeatClassChange: (sc: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS') => void;
  error?: string;
}

export function PassengerCounter({
                                   value,
                                   seatClass,
                                   onChange,
                                   onSeatClassChange,
                                   error,
                                 }: PassengerCounterProps) {
  const total = value.adults + value.children + value.infants;

  const update = (key: keyof PassengerCounts, delta: number) => {
    const nextVal = Math.max(0, value[key] + delta);
    if (key === 'adults' && nextVal < 1) return;
    onChange({ ...value, [key]: nextVal });
  };

  const getSeatClassText = (code: string) => {
    switch (code) {
      case 'BUSINESS':
        return 'Thương gia';
      case 'PREMIUM_ECONOMY':
        return 'Phổ thông đặc biệt';
      default:
        return 'Phổ thông';
    }
  };

  return (
    <Popover>
      <PopoverTrigger >
        <div
          role="button"
          tabIndex={0}
          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all bg-white hover:border-blue-500 relative ${
            error ? 'border-rose-500' : 'border-slate-200'
          }`}
        >
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-blue-600"/> Hành khách & Hạng ghế
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base font-bold text-slate-900">{total} Hành khách</span>
            <span className="text-xs text-slate-500 truncate">({getSeatClassText(seatClass)})</span>
          </div>
          {error && <span className="text-[11px] font-medium text-rose-500 absolute -bottom-5 left-1">{error}</span>}
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-5 rounded-2xl shadow-xl space-y-4">
        {/* Người lớn */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Người lớn</p>
            <p className="text-xs text-slate-400">Từ 12 tuổi trở lên</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={value.adults <= 1}
              onClick={() => update('adults', -1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5"/>
            </button>
            <span className="w-5 text-center font-bold text-sm">{value.adults}</span>
            <button
              type="button"
              disabled={value.adults >= 9}
              onClick={() => update('adults', 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>

        {/* Trẻ em */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Trẻ em</p>
            <p className="text-xs text-slate-400">Từ 2 đến 11 tuổi</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={value.children <= 0}
              onClick={() => update('children', -1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5"/>
            </button>
            <span className="w-5 text-center font-bold text-sm">{value.children}</span>
            <button
              type="button"
              disabled={value.children >= 8}
              onClick={() => update('children', 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>

        {/* Em bé */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Em bé</p>
            <p className="text-xs text-slate-400">Dưới 2 tuổi (ngồi chung)</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={value.infants <= 0}
              onClick={() => update('infants', -1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5"/>
            </button>
            <span className="w-5 text-center font-bold text-sm">{value.infants}</span>
            <button
              type="button"
              disabled={value.infants >= value.adults}
              onClick={() => update('infants', 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>

        {/* Hạng ghế */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Hạng chỗ ngồi</p>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS'] as const).map((sc) => (
              <button
                type="button"
                key={sc}
                onClick={() => onSeatClassChange(sc)}
                className={`py-2 px-1.5 rounded-lg font-semibold border text-center transition-all ${
                  seatClass === sc
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sc === 'ECONOMY' ? 'Phổ thông' : sc === 'BUSINESS' ? 'Thương gia' : 'Đặc biệt'}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
