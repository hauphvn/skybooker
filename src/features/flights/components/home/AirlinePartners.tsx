import { BadgeCheck } from 'lucide-react';

const AIRLINES = [
  {
    code: 'VN',
    name: 'Vietnam Airlines',
    note: 'Hàng không quốc gia',
    className: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    code: 'VJ',
    name: 'Vietjet Air',
    note: 'Hãng bay giá rẻ',
    className: 'bg-rose-50 text-rose-600 border-rose-100',
  },
  {
    code: 'QH',
    name: 'Bamboo Airways',
    note: 'Bay thẳng nhiều chặng',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    code: 'VU',
    name: 'Vietravel Airlines',
    note: 'Kết nối điểm đến mới',
    className: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    code: 'BL',
    name: 'Pacific Airlines',
    note: 'Giá vé tiết kiệm',
    className: 'bg-sky-50 text-sky-700 border-sky-100',
  },
] as const;

export function AirlinePartners() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Đối tác hàng không
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Kết nối với các hãng bay hàng đầu
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-500">
            Hệ thống đặt chỗ kết nối trực tiếp GDS/NDC, giúp bạn so sánh giá và chọn chuyến bay từ
            hơn 500 hãng hàng không trong nước và quốc tế.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {AIRLINES.map((airline) => (
            <div
              key={airline.code}
              className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white px-4 py-5 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-sm font-black tracking-wider ${airline.className}`}
              >
                {airline.code}
              </span>
              <span className="mt-3 flex items-center gap-1 text-sm font-bold text-slate-800">
                {airline.name}
                <BadgeCheck className="h-3.5 w-3.5 text-blue-500" />
              </span>
              <span className="mt-0.5 text-[11px] text-slate-400">{airline.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
