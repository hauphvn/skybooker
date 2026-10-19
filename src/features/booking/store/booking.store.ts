// src/features/booking/store/booking.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {BaggageOption, MealOption} from "@/features/booking/domain/pricing/strategies";

export interface Passenger {
  title: 'MR' | 'MRS' | 'MS';
  firstName: string;
  lastName: string;
  dob: string;
  idNumber: string;
}

interface BookingState {
  selectedFlightId: string | null;
  baseFare: number;
  contactEmail: string;
  contactPhone: string;
  passengers: Passenger[];
  ancillary: {
    baggage: BaggageOption;
    meal: MealOption;
    hasInsurance: boolean;
  };
  pnr: string | null;
  holdExpiresAt: number | null; // Timestamp hết hạn giữ chỗ (15 phút)

  // Actions
  selectFlight: (flightId: string, baseFare?: number) => void;
  setBookingData: (data: {
    contactEmail: string;
    contactPhone: string;
    passengers: Passenger[];
    ancillary: { baggage: BaggageOption; meal: MealOption; hasInsurance: boolean };
  }) => void;
  confirmBooking: () => string; // Tạo mã PNR và đặt mốc 15 phút
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedFlightId: 'OFFER-VN248',
      baseFare: 1450000,
      contactEmail: '',
      contactPhone: '',
      passengers: [
        { title: 'MR', firstName: 'VAN HAU', lastName: 'PHAM', dob: '1995-05-12', idNumber: '079095001234' },
      ],
      ancillary: {
        baggage: '20kg',
        meal: 'NONE',
        hasInsurance: true,
      },
      pnr: null,
      holdExpiresAt: null,

      selectFlight: (flightId, baseFare = 1450000) =>
        set({ selectedFlightId: flightId, baseFare }),

      setBookingData: (data) =>
        set({
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          passengers: data.passengers,
          ancillary: data.ancillary,
        }),

      confirmBooking: () => {
        // Tạo PNR mô phỏng 6 ký tự chuẩn IATA (VD: VN789A)
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let generatedPnr = 'VN';
        for (let i = 0; i < 4; i++) {
          generatedPnr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const fifteenMinutesAhead = Date.now() + 15 * 60 * 1000;

        set({ pnr: generatedPnr, holdExpiresAt: fifteenMinutesAhead });
        return generatedPnr;
      },

      resetBooking: () =>
        set({
          selectedFlightId: null,
          passengers: [],
          pnr: null,
          holdExpiresAt: null,
        }),
    }),
    {
      name: 'ota-booking-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
