// src/features/flights/components/AirportSelector.tsx
'use client';

import  { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { POPULAR_AIRPORTS, AirportItem } from '../domain/airports';
import { PlaneTakeoff, PlaneLanding, Search } from 'lucide-react';

interface AirportSelectorProps {
  label: string;
  value: string;
  onChange: (code: string) => void;
  type: 'origin' | 'destination';
  error?: string;
}

export function AirportSelector({ label, value, onChange, type, error }: AirportSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const currentAirport = POPULAR_AIRPORTS.find((a) => a.code === value);

  const filteredAirports = POPULAR_AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(searchKey.toLowerCase()) ||
      a.code.toLowerCase().includes(searchKey.toLowerCase()) ||
      a.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger >
        <div
          role="button"
          tabIndex={0}
          className={`relative p-3.5 rounded-xl border text-left cursor-pointer transition-all bg-white hover:border-blue-500 ${
            error ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
          }`}
        >
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            {type === 'origin' ? <PlaneTakeoff className="w-3.5 h-3.5 text-blue-600"/> : <PlaneLanding className="w-3.5 h-3.5 text-blue-600"/>}
            {label}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-mono font-black text-slate-900">{value}</span>
            <span className="text-sm font-medium text-slate-600 truncate">
              {currentAirport ? currentAirport.city : 'Chọn điểm đến'}
            </span>
          </div>
          {error && <span className="text-[11px] font-medium text-rose-500 absolute -bottom-5 left-1">{error}</span>}
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-80 p-0 rounded-2xl shadow-xl">
        <div className="p-3 border-b border-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400"/>
          <input
            type="text"
            placeholder="Tìm theo tên thành phố hoặc mã (SGN, HAN...)"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="w-full text-xs outline-none bg-transparent placeholder:text-slate-400"
          />
        </div>
        <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 p-1">
          {filteredAirports.map((airport: AirportItem) => (
            <div
              key={airport.code}
              onClick={() => {
                onChange(airport.code);
                setOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-slate-800">{airport.city}</p>
                <p className="text-xs text-slate-400">{airport.name}</p>
              </div>
              <span className="font-mono text-sm font-extrabold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                {airport.code}
              </span>
            </div>
          ))}
          {filteredAirports.length === 0 && (
            <p className="text-xs text-center text-slate-400 py-6">Không tìm thấy sân bay phù hợp</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
