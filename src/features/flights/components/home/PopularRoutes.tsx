import Link from 'next/link';
import { ArrowRight, Clock, Plane } from 'lucide-react';
import { POPULAR_ROUTES, formatVnd, getRouteHref } from '../../domain/popularRoutes';

export function PopularRoutes() {
  return (
    <section id="diem-den" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Điểm đến được yêu thích
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Bay nội địa với giá tốt mỗi ngày
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Giá vé được cập nhật liên tục từ các hãng hàng không. Chọn chặng bay phù hợp và đặt
              ngay để giữ giá tốt.
            </p>
          </div>

          <Link
            href="/flights"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-2.5 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
          >
            Xem tất cả chuyến bay
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ROUTES.map((route) => (
            <Link
              key={`${route.from}-${route.to}`}
              href={getRouteHref(route)}
              className="group relative flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >
              {route.tag && (
                <span className="absolute right-4 top-4 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  {route.tag}
                </span>
              )}

              <div className="flex items-center gap-3 pr-16">
                <div>
                  <div className="font-mono text-xl font-black tracking-wide text-slate-900">
                    {route.from}
                  </div>
                  <div className="mt-0.5 max-w-[110px] truncate text-xs font-medium text-slate-500">
                    {route.fromCity}
                  </div>
                </div>

                <div className="flex flex-1 flex-col items-center px-1">
                  <span className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <Clock className="h-3 w-3" /> {route.duration}
                  </span>
                  <div className="flex w-full items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                    <Plane className="h-3.5 w-3.5 text-blue-600" />
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  </div>
                  <span className="mt-1 text-[10px] font-semibold text-emerald-600">Bay thẳng</span>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xl font-black tracking-wide text-slate-900">
                    {route.to}
                  </div>
                  <div className="mt-0.5 max-w-[110px] truncate text-xs font-medium text-slate-500">
                    {route.toCity}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <span className="block text-[11px] font-medium text-slate-400">Giá từ / khách</span>
                  <div className="text-xl font-extrabold text-orange-600">
                    {formatVnd(route.price)}
                    <span className="ml-1 text-sm font-bold text-orange-400">₫</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white transition-colors group-hover:bg-blue-700">
                  Chọn chuyến
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
