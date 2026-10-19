export interface PopularRoute {
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  price: number;
  duration: string;
  tag?: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    from: 'SGN',
    fromCity: 'TP. Hồ Chí Minh',
    to: 'HAN',
    toCity: 'Hà Nội',
    price: 1_240_000,
    duration: '2h 10m',
    tag: 'Bán chạy',
  },
  {
    from: 'HAN',
    fromCity: 'Hà Nội',
    to: 'DAD',
    toCity: 'Đà Nẵng',
    price: 950_000,
    duration: '1h 20m',
  },
  {
    from: 'SGN',
    fromCity: 'TP. Hồ Chí Minh',
    to: 'PQC',
    toCity: 'Phú Quốc',
    price: 1_120_000,
    duration: '1h 05m',
    tag: 'Giá tốt',
  },
  {
    from: 'HAN',
    fromCity: 'Hà Nội',
    to: 'PQC',
    toCity: 'Phú Quốc',
    price: 1_450_000,
    duration: '2h 15m',
  },
  {
    from: 'SGN',
    fromCity: 'TP. Hồ Chí Minh',
    to: 'DAD',
    toCity: 'Đà Nẵng',
    price: 890_000,
    duration: '1h 25m',
    tag: 'Rẻ nhất',
  },
  {
    from: 'HAN',
    fromCity: 'Hà Nội',
    to: 'CXR',
    toCity: 'Nha Trang',
    price: 1_390_000,
    duration: '1h 55m',
  },
];

export function getRouteHref(route: Pick<PopularRoute, 'from' | 'to'>) {
  return `/flights?from=${route.from}&to=${route.to}`;
}

export function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN').format(value);
}
