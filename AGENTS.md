<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read
the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next`
package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at
`node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted
change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 1. DESIGN TOKENS & SYSTEM THEME

Giao diện áp dụng phong cách OTA hiện đại (tương tự Traveloka/Agoda/Booking), ưu tiên độ tương phản cao, xử lý hiển thị
thông tin dày đặc một cách rõ ràng và trực quan.

### 1.1. Color Palette (Semantic Tokens)

Không sử dụng mã màu hex tùy tiện trong code component. Phải tuân thủ biến CSS hoặc Tailwind semantic classes:

- **Primary (Thương hiệu OTA):**
  - Main: `#0064D2` (`bg-blue-600` / `text-blue-600`) - Tạo độ tin cậy.
  - Hover/Dark: `#004F9E` (`bg-blue-700`)
  - Subtle/Light: `#EBF3FC` (`bg-blue-50`)
- **Accent / Conversion (CTA, Giá vé rẻ nhất, Countdown):**
  - Main: `#FF5E1F` (`bg-orange-500` / `text-orange-500`) - Thôi thúc chuyển đổi.
  - Hover: `#E04E15` (`bg-orange-600`)
  - Subtle: `#FFF5F0` (`bg-orange-50`)
- **Neutrals (Text & Backgrounds):**
  - Page Background: `#F8FAFC` (`bg-slate-50`)
  - Card/Surface: `#FFFFFF` (`bg-white`)
  - Title & Heading: `#0F172A` (`text-slate-900`)
  - Subtitle & Body: `#475569` (`text-slate-600`)
  - Caption & Muted: `#94A3B8` (`text-slate-400`)
  - Borders & Dividers: `#E2E8F0` (`border-slate-200`)
- **Status Colors:**
  - Success (Confirmed, On-time): `#10B981` (`text-emerald-600`, `bg-emerald-50`)
  - Warning (Holding time, Pending): `#F59E0B` (`text-amber-600`, `bg-amber-50`)
  - Danger (Expired, Price changed): `#EF4444` (`text-rose-600`, `bg-rose-50`)

### 1.2. Typography & Hierarchy

- Font Family: `Inter` hoặc `system-ui` (Sans-serif hiện đại).
- Hierarchy:
  - **H1 (Hero / Section Title):** `text-2xl` đến `text-3xl font-extrabold tracking-tight text-slate-900`
  - **H2 (Card / Modal Title):** `text-lg` đến `text-xl font-bold text-slate-800`
  - **IATA Code (Mã sân bay):** `text-xl font-black text-slate-900 tracking-wide font-mono`
  - **PNR Code (Mã đặt chỗ):** `text-2xl font-mono font-black text-blue-700 tracking-widest`
  - **Price Primary:** `text-xl font-extrabold text-blue-600` hoặc `text-orange-600`
  - **Body / Labels:** `text-sm font-medium text-slate-600`
  - **Caption / Meta:** `text-xs text-slate-400`

### 1.3. Spacing, Borders & Shadows

- **Border Radius:**
  - Input & Controls: `rounded-xl` (12px)
  - Cards & Containers: `rounded-2xl` (16px)
  - Hero Widget: `rounded-3xl` (24px)
  - Badges & Buttons: `rounded-lg` hoặc `rounded-full`
- **Shadows:**
  - Standard Card: `shadow-sm border border-slate-200/80`
  - Hover Elevate: `hover:shadow-md hover:border-blue-300 transition-all duration-200`
  - Floating Widget: `shadow-xl shadow-slate-200/50`

---

## 2. KIẾN TRÚC THƯ MỤC (FEATURE-DRIVEN MODULAR)

Mọi code mới phát sinh phải nằm đúng thư mục trách nhiệm theo mô hình dưới đây:

```text
src/
├── app/                          # Next.js App Router (RSC, Layouts, Pages)
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Home Page (Search Widget)
│   ├── flights/
│   │   ├── page.tsx              # Search Results Page (RSC + Suspense)
│   │   └── loading.tsx           # Skeleton Loader
│   ├── booking/
│   │   ├── checkout/page.tsx     # Passenger & Ancillary Form
│   │   └── confirmation/page.tsx # PNR & Countdown View
│   └── api/
│       └── flights/search/route.ts # Mock API chuẩn cấu trúc Amadeus NDC
├── features/                     # Domain Features (Business logic cô lập)
│   ├── flights/
│   │   ├── components/           # SearchWidget, FlightCard, FilterSidebar, FlightSkeleton
│   │   ├── hooks/                # useFlightFilter, useAirportSearch
│   │   ├── domain/               # flight.types.ts (IATA NDC schemas)
│   │   └── infrastructure/       # amadeus.adapter.ts, flight.api.ts
│   └── booking/
│       ├── components/           # PassengerForm, BaggageSelector, PnrCard, CountdownTimer
│       ├── domain/               # pricing.strategy.ts, booking.types.ts
│       └── store/                # booking.store.ts (Zustand + Persist)
└── shared/                       # Tái sử dụng toàn hệ thống
    ├── components/
    │   ├── ui/                   # shadcn/ui components (Button, Card, Popover...)
    │   └── common/               # Navbar, Footer, CurrencyFormat
    ├── hooks/                    # useCountdownTimer, useDebounce, useIsMounted
    └── lib/                      # utils.ts, constants.ts
