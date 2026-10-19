// src/features/flights/components/FilterSidebar.tsx
'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentAirline = searchParams.get('airline') || 'ALL';
  const currentSort = searchParams.get('sort') || 'price_asc';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'ALL') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, {scroll: false});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6">
      <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
        Bộ lọc tìm kiếm
      </h3>

      {/* Sắp xếp giá */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
          Sắp xếp theo
        </label>
        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full text-xs font-semibold border border-slate-200 rounded-xl p-2.5 bg-white text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="price_asc">Giá: Thấp đến cao</option>
          <option value="price_desc">Giá: Cao đến thấp</option>
        </select>
      </div>

      {/* Lọc Hãng hàng không */}
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
          Hãng hàng không
        </label>
        <div className="space-y-2 text-xs font-medium">
          {[
            {code: 'ALL', name: 'Tất cả hãng'},
            {code: 'VN', name: 'Vietnam Airlines'},
            {code: 'VJ', name: 'Vietjet Air'},
            {code: 'QH', name: 'Bamboo Airways'},
          ].map((airline) => (
            <label
              key={airline.code}
              className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-blue-600"
            >
              <input
                type="radio"
                name="airlineFilter"
                checked={currentAirline === airline.code}
                onChange={() => updateParam('airline', airline.code)}
                className="w-3.5 h-3.5 accent-blue-600"
              />
              <span>{airline.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
