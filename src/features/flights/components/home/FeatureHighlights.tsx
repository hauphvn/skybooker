import { BadgeCheck, Headphones, RefreshCw, ShieldCheck } from 'lucide-react';
import { BRAND } from '@/shared/lib/brand';

const FEATURES = [
  {
    icon: BadgeCheck,
    title: 'Giá vé minh bạch',
    description: 'Hiển thị đầy đủ thuế, phí và hành lý trước khi thanh toán, không phát sinh ẩn.',
  },
  {
    icon: ShieldCheck,
    title: 'Thanh toán an toàn',
    description: 'Mã hoá SSL 256-bit, hỗ trợ thẻ quốc tế, ATM nội địa và ví điện tử.',
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn luôn sẵn sàng đồng hành trước, trong và sau chuyến bay.',
  },
  {
    icon: RefreshCw,
    title: 'Đổi huỷ linh hoạt',
    description: 'Chính sách đổi/hoàn vé rõ ràng, xử lý nhanh chóng theo từng hãng hàng không.',
  },
] as const;

export function FeatureHighlights() {
  return (
    <section id="vi-sao" className="relative z-10 -mt-14 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Vì sao chọn {BRAND.name}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Đặt vé dễ dàng, an tâm trên mọi hành trình
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Chúng tôi kết nối trực tiếp với các hệ thống đặt chỗ toàn cầu để mang đến giá vé tốt
              nhất cùng trải nghiệm đặt vé đơn giản, nhanh chóng.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
