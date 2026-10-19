import Link from 'next/link';
import { Headphones, Phone } from 'lucide-react';
import { BrandLogo } from '@/shared/components/common/BrandLogo';
import { BRAND, MAIN_NAV } from '@/shared/lib/brand';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo showTagline />

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={BRAND.hotlineHref}
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 md:flex"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Headphones className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Tổng đài 24/7
              </span>
              <span className="text-sm font-extrabold text-slate-900">{BRAND.hotline}</span>
            </span>
          </a>

          <a
            href={BRAND.hotlineHref}
            aria-label={`Gọi tổng đài ${BRAND.hotline}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-700 md:hidden"
          >
            <Phone className="h-4 w-4" />
          </a>

          <Link
            href="/booking/confirmation"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95 sm:px-5"
          >
            Quản lý đặt chỗ
          </Link>
        </div>
      </div>

      {/* Navigation mobile */}
      <nav
        aria-label="Điều hướng di động"
        className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
      >
        {MAIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
