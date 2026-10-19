// src/features/flights/domain/airports.ts
export interface AirportItem {
  code: string;
  city: string;
  name: string;
  country: string;
}

export const POPULAR_AIRPORTS: AirportItem[] = [
  { code: 'SGN', city: 'Hồ Chí Minh', name: 'Sân bay Tân Sơn Nhất', country: 'Việt Nam' },
  { code: 'HAN', city: 'Hà Nội', name: 'Sân bay Nội Bài', country: 'Việt Nam' },
  { code: 'DAD', city: 'Đà Nẵng', name: 'Sân bay Quốc tế Đà Nẵng', country: 'Việt Nam' },
  { code: 'PQC', city: 'Phú Quốc', name: 'Sân bay Quốc tế Phú Quốc', country: 'Việt Nam' },
  { code: 'VII', city: 'Vinh', name: 'Sân bay Vinh', country: 'Việt Nam' },
  { code: 'CXR', city: 'Nha Trang', name: 'Sân bay Cam Ranh', country: 'Việt Nam' },
];
