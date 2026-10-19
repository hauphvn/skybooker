import Link from 'next/link';
import { Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND } from '@/shared/lib/brand';

interface BrandLogoProps {
  /** `light` dùng cho nền tối (footer, hero). */
  variant?: 'default' | 'light';
  showTagline?: boolean;
  href?: string;
  className?: string;
}

/**
 * Logo thương hiệu dạng component (không cần file ảnh).
 * Muốn đổi logo: thay icon `Plane` bằng icon/ảnh mong muốn.
 */
export function BrandLogo({
  variant = 'default',
  showTagline = false,
  href = '/',
  className,
}: BrandLogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      href={href}
      aria-label={`${BRAND.name} - Trang chủ`}
      className={cn('group flex shrink-0 items-center gap-2.5', className)}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-600/25 transition-transform duration-200 group-hover:-translate-y-0.5">
        <Plane className="h-5 w-5 -rotate-45" strokeWidth={2.25} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-orange-500" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-xl font-black tracking-tight',
            isLight ? 'text-white' : 'text-slate-900'
          )}
        >
          {BRAND.name}
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
              isLight ? 'text-blue-100/80' : 'text-slate-400'
            )}
          >
            {BRAND.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
