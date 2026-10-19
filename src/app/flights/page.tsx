// src/app/flights/page.tsx
import {Suspense} from 'react';
import type {Metadata} from 'next';
import FlightList from '@/features/flights/components/FlightList';
import FlightListSkeleton from '@/features/flights/components/FlightListSkeleton';
import FilterSidebar from '@/features/flights/components/FilterSidebar';

// Trang kết quả tìm kiếm phụ thuộc searchParams + inventory real-time nên cho phép render blocking
export const instant = false;

interface PageProps {
  searchParams: Promise<{
    from?: string;
    to?: string;
    deptDate?: string;
    airline?: string;
    sort?: string;
  }>;
}

// 1. Dynamic SEO Metadata theo chặng bay
export async function generateMetadata({searchParams}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const from = params.from || 'SGN';
  const to = params.to || 'HAN';
  const date = params.deptDate || '2026-10-20';

  return {
    title: `Vé máy bay ${from} đi ${to} ngày ${date} | EnVietBooker`,
    description: `So sánh giá vé máy bay chặng ${from} - ${to} giá tốt nhất từ Vietnam Airlines, Vietjet Air, Bamboo Airways.`,
  };
}

// 2. Server Component Page
export default async function FlightsPage({searchParams}: PageProps) {
  const resolvedParams = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Route Header Info */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {resolvedParams.from || 'SGN'} $\rightarrow$ {resolvedParams.to || 'HAN'}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ngày bay: {resolvedParams.deptDate || '2026-10-20'} • 1 Hành khách • Phổ thông
            </p>
          </div>
          <a
            href="/public"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 border border-blue-200 px-4 py-2 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors w-fit"
          >
            Đổi tìm kiếm
          </a>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Client Component: Sidebar Filter */}
          <aside className="lg:col-span-1">
            <FilterSidebar/>
          </aside>

          {/* Server Component Streaming Container */}
          <section className="lg:col-span-3">
            <Suspense
              key={JSON.stringify(resolvedParams)}
              fallback={<FlightListSkeleton/>}
            >
              <FlightList searchParams={resolvedParams}/>
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}
