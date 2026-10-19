import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from '@/shared/components/common/BrandLogo';
import { BRAND } from '@/shared/lib/brand';

const FOOTER_LINKS = [
  {
    title: 'Về chúng tôi',
    links: [
      { label: 'Giới thiệu', href: '/#vi-sao' },
      { label: 'Điều khoản sử dụng', href: '#' },
      { label: 'Chính sách bảo mật', href: '#' },
      { label: 'Tuyển dụng', href: '#' },
    ],
  },
  {
    title: 'Dịch vụ',
    links: [
      { label: 'Vé máy bay nội địa', href: '/flights' },
      { label: 'Vé máy bay quốc tế', href: '/flights' },
      { label: 'Combo vé + khách sạn', href: '/#uu-dai' },
      { label: 'Hành lý & bảo hiểm', href: '/#ho-tro' },
    ],
  },
  {
    title: 'Hỗ trợ khách hàng',
    links: [
      { label: 'Trung tâm trợ giúp', href: '/#ho-tro' },
      { label: 'Quản lý đặt chỗ', href: '/booking/confirmation' },
      { label: 'Chính sách hoàn vé', href: '#' },
      { label: 'Câu hỏi thường gặp', href: '/#ho-tro' },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo variant="light" showTagline href="/" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">{BRAND.description}</p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={BRAND.hotlineHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-blue-400">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                    Tổng đài
                  </span>
                  <span className="font-bold text-white">{BRAND.hotline}</span>
                </span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-blue-400">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-slate-300">{BRAND.email}</span>
              </a>

              <p className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-blue-400">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-slate-400">{BRAND.address}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {BRAND.copyrightYear} {BRAND.name}. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1">Thanh toán an toàn</span>
            {['Visa', 'Mastercard', 'ATM', 'VNPay', 'MoMo'].map((method) => (
              <span
                key={method}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-semibold text-slate-400"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
