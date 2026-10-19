export const BRAND = {
  name: 'EnVietBooker',
  tagline: 'Bay cao, giá tốt',
  slogan: 'Vé máy bay giá tốt mỗi ngày',
  description:
    'Nền tảng đặt vé máy bay trực tuyến giúp bạn so sánh giá, chọn chuyến bay phù hợp và đặt vé chỉ trong vài phút.',

  hotline: '1900 6868',
  hotlineHref: 'tel:19006868',
  email: 'hotro@envietbooker.vn',
  address: '16B Sông Đà , Phường Tân Sơn Hòa.Hồ Chí Minh',

  // Đổi năm tại đây khi sang năm mới (tránh dùng new Date() trong server component
  // vì Next.js 16 cacheComponents sẽ báo lỗi khi prerender).
  copyrightYear: 2026,
} as const;

export const MAIN_NAV = [
  {label: 'Vé máy bay', href: '/flights'},
  {label: 'Điểm đến', href: '/#diem-den'},
  {label: 'Ưu đãi', href: '/#uu-dai'},
  {label: 'Vì sao chọn chúng tôi', href: '/#vi-sao'},
  {label: 'Hỗ trợ', href: '/#ho-tro'},
] as const;
