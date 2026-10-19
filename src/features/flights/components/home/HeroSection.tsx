import Link from 'next/link';
import { Headphones, Plane, Sparkles, Star } from 'lucide-react';
import { FlightSearchWidget } from '@/features/flights/components/FlightSearchWidget';
import { BRAND } from '@/shared/lib/brand';
import { POPULAR_ROUTES, getRouteHref } from '../../domain/popularRoutes';

const HERO_STATS = [
  { icon: Plane, value: '500+', label: 'Hãng & chặng bay' },
  { icon: Star, value: '4.9/5', label: 'Khách hàng hài lòng' },
  { icon: Headphones, value: '24/7', label: 'Hỗ trợ trực tuyến' },
] as const;

export function HeroSection() {
  return (
    <section
      id="dat-ve"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#003f7d_0%,#0064D2_52%,#2b8cf0_100%)]"
    >
      {/* Hoạ tiết nền */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"
      />
      <Plane
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-16 hidden h-40 w-40 -rotate-12 text-white/10 lg:block"
        strokeWidth={1.2}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-orange-300" />
            Ưu đãi vé máy bay mùa thu — Giảm đến 20%
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Chạm tay đặt vé, bay khắp muôn nơi cùng{' '}
            <span className="text-orange-300">{BRAND.name}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-50/85 sm:text-base">
            So sánh giá vé từ hàng trăm hãng hàng không, chọn giờ bay phù hợp và hoàn tất đặt
            chỗ chỉ trong vài phút. Hành trình của bạn, chúng tôi lo trọn vẹn.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-orange-300">
                  <stat.icon className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-extrabold text-white">{stat.value}</span>
                  <span className="block text-[11px] font-medium text-blue-100/75">
                    {stat.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-9 max-w-6xl">
          <FlightSearchWidget />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-blue-50/80">
            <span className="font-semibold text-white/80">Gợi ý hôm nay:</span>
            {POPULAR_ROUTES.slice(0, 4).map((route) => (
              <Link
                key={`${route.from}-${route.to}`}
                href={getRouteHref(route)}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-semibold text-white transition-colors hover:bg-white/20"
              >
                {route.from} → {route.to}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
