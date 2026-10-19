import { Headphones, Mail, Phone } from 'lucide-react';
import { BRAND } from '@/shared/lib/brand';

export function SupportCta() {
  return (
    <section id="ho-tro" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6 py-10 text-white shadow-xl sm:px-10 lg:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-blue-100">
                <Headphones className="h-3.5 w-3.5 text-orange-300" />
                Đồng hành cùng bạn mọi hành trình
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Cần hỗ trợ đặt vé? <br className="hidden sm:block" />
                Chúng tôi luôn ở đây 24/7.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                Gọi ngay tổng đài hoặc gửi email để được tư vấn chuyến bay, hành lý, hoàn đổi vé và
                các dịch vụ đi kèm.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={BRAND.hotlineHref}
                className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10 sm:max-w-[240px]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <Phone className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Tổng đài miễn phí
                  </span>
                  <span className="block text-base font-extrabold text-white">{BRAND.hotline}</span>
                </span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10 sm:max-w-[240px]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Email hỗ trợ
                  </span>
                  <span className="block truncate text-sm font-bold text-white">{BRAND.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
