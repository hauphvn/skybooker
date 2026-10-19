// src/features/flights/components/FlightListSkeleton.tsx
export default function FlightListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Skeleton Top Bar */}
      <div className="h-12 bg-white rounded-xl border border-slate-200 animate-pulse" />

      {/* 3 Flight Card Skeletons */}
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Airline Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-xl" />
              <div className="space-y-2">
                <div className="w-28 h-4 bg-slate-200 rounded" />
                <div className="w-16 h-3 bg-slate-100 rounded" />
              </div>
            </div>

            {/* Flight Route Timeline */}
            <div className="flex items-center gap-8 justify-center">
              <div className="space-y-1.5 text-center">
                <div className="w-12 h-6 bg-slate-200 rounded mx-auto" />
                <div className="w-10 h-3 bg-slate-100 rounded mx-auto" />
              </div>
              <div className="w-24 md:w-32 h-1 bg-slate-200 rounded" />
              <div className="space-y-1.5 text-center">
                <div className="w-12 h-6 bg-slate-200 rounded mx-auto" />
                <div className="w-10 h-3 bg-slate-100 rounded mx-auto" />
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex md:flex-col items-end justify-between gap-2">
              <div className="w-24 h-6 bg-slate-200 rounded" />
              <div className="w-28 h-10 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
