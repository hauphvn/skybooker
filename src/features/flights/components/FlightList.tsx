// src/features/flights/components/FlightList.tsx
import { AmadeusFlightAdapter } from '../infrastructure/amadeus.adapter';
import { RawAmadeusFlightOffer } from '../domain/flight.types';
import FlightCard from './FlightCard';

interface FlightListProps {
  searchParams: {
    from?: string;
    to?: string;
    deptDate?: string;
    airline?: string;
    sort?: string;
  };
}

async function fetchFlights(params: FlightListProps['searchParams']) {
  const from = params.from || 'SGN';
  const to = params.to || 'HAN';
  const date = params.deptDate || '2026-10-20';

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/flights/search?from=${from}&to=${to}&date=${date}`, {
    cache: 'no-store', // Giữ dynamic SSR mô phỏng real-time inventory
  });

  if (!res.ok) {
    throw new Error('Không thể tải dữ liệu chuyến bay từ GDS');
  }

  const json = await res.json();
  const rawOffers: RawAmadeusFlightOffer[] = json.data;

  // Áp dụng Adapter Pattern biến đổi sang UI Domain Entity
  let offers = AmadeusFlightAdapter.toDomainList(rawOffers);

  // Lọc theo hãng hàng không nếu có query param
  if (params.airline && params.airline !== 'ALL') {
    offers = offers.filter((f) => f.airlineCode === params.airline);
  }

  // Sắp xếp
  if (params.sort === 'price_asc') {
    offers.sort((a, b) => a.totalPrice - b.totalPrice);
  } else if (params.sort === 'price_desc') {
    offers.sort((a, b) => b.totalPrice - a.totalPrice);
  }

  return offers;
}

export default async function FlightList({ searchParams }: FlightListProps) {
  const flights = await fetchFlights(searchParams);

  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500 font-medium">Không tìm thấy chuyến bay phù hợp với bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Tìm thấy {flights.length} chuyến bay</span>
        <span className="text-blue-600">Đã cập nhật theo thời gian thực</span>
      </div>

      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
