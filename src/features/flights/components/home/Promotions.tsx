import Link from 'next/link';
import { ArrowRight, Globe, Hotel, Plane, Ticket } from 'lucide-react';

const PROMOTIONS = [
  {
    icon: Plane,
    badge: 'Nội địa',
    title: 'Giảm 20% vé máy bay nội địa',
    description: 'Áp dụng cho các chuyến bay khởi hành trước ngày 30/11. Số lượng có hạn.',
    code: 'BAYVIETNAM',
    cta: 'Săn vé ngay',
    href: '/flights',
    className: 'from-blue-700 via-blue-600 to-blue-500',
  },
  {
    icon: Globe,
    badge: 'Quốc tế',
    title: 'Quốc tế giá tốt, bay xa thoả thích',
    description: 'Ưu đãi lên đến 1.500.000₫ cho các chặng bay Đông Á và Đông Nam Á.',
    code: 'WORLD2026',
    cta: 'Khám phá ưu đãi',
    href: '/flights',
    className: 'from-orange-600 via-orange-500 to-amber-500',
  },
  {
    icon: Hotel,
    badge: 'Combo',
    title: 'Combo vé + khách sạn tiết kiệm 30%',
    description: 'Trọn gói chuyến đi cho gia đình và cặp đôi, miễn phí đổi ngày một lần.',
    code: 'STAYSAVE',
    cta: 'Xem combo',
    href: '/#diem-den',
    className: 'from-emerald-700 via-emerald-600 to-teal-500',
  },
] as const;

export function Promotions() {
  return (
    <section id="uu-dai" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              Ưu đãi hôm nay
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Săn vé giá tốt, vi vu khắp chốn
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Các chương trình khuyến mãi được cập nhật thường xuyên. Đặt sớm để không bỏ lỡ giá tốt
            nhất.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.code}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${promo.className} p-6 text-white shadow-lg`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/10"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <promo.icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    {promo.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold leading-snug">{promo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{promo.description}</p>

                <div className="mt-5 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-lg border border-dashed border-white/40 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-widest">
                    <Ticket className="h-3.5 w-3.5" />
                    {promo.code}
                  </span>
                </div>

                <Link
                  href={promo.href}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
                >
                  {promo.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
