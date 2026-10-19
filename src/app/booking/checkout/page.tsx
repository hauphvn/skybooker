// src/app/booking/checkout/page.tsx
'use client';

import {useRouter} from 'next/navigation';
import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowRight, Mail, Phone, Users} from 'lucide-react';
import {checkoutFormSchema, CheckoutFormValues} from '@/features/booking/domain/passenger.schema';
import {AncillarySelector} from '@/features/booking/components/AncillarySelector';
import {useBookingStore} from '@/features/booking/store/booking.store';
import {FareCalculatorContext} from "@/features/booking/domain/pricing/strategies";

export default function CheckoutPage() {
  const router = useRouter();
  const {baseFare, setBookingData, confirmBooking} = useBookingStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      contactEmail: 'hau.pham@kaykafe.com',
      contactPhone: '0967900801',
      passengers: [
        {
          title: 'MR',
          lastName: 'PHAM',
          firstName: 'VAN HAU',
          dob: '1995-05-12',
          idNumber: '079095001234',
        },
      ],
      baggage: '20kg',
      meal: 'NONE',
      hasInsurance: true,
    },
  });

  // Không dùng useFieldArray: nó sinh id bằng crypto.randomUUID() ngay trong render,
  // khiến Cache Components chặn prerender. Chỉ cần theo dõi độ dài danh sách hành khách.
  const watchedPassengers = useWatch({control, name: 'passengers'});
  const passengerCount = watchedPassengers?.length ?? 1;

  const watchedBaggage = watch('baggage');
  const watchedMeal = watch('meal');
  const watchedInsurance = watch('hasInsurance');

  // Tính toán chiết tính giá vé theo Strategy Pattern
  const calculator = new FareCalculatorContext();
  const pricing = calculator.calculateTotal(
    baseFare || 1450000,
    passengerCount,
    watchedBaggage,
    watchedMeal,
    watchedInsurance
  );

  const formatVND = (amount: number) => new Intl.NumberFormat('vi-VN').format(amount);

  const onSubmit = (data: CheckoutFormValues) => {
    setBookingData({
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      passengers: data.passengers,
      ancillary: {
        baggage: data.baggage,
        meal: data.meal,
        hasInsurance: data.hasInsurance,
      },
    });

    confirmBooking();
    router.push('/booking/confirmation');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
          Thông tin hành khách & Dịch vụ
        </h1>
        <p className="text-xs text-slate-500 mb-8">
          Vui lòng kiểm tra kỹ họ tên trùng khớp với CCCD hoặc Hộ chiếu đi máy bay.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cột trái: Form nhập liệu & Dịch vụ phụ trợ */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. Thông tin liên hệ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2
                  className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600"/> Thông tin liên hệ nhận vé
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Email nhận E-ticket</label>
                    <input
                      type="email"
                      {...control.register('contactEmail')}
                      className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-600"
                    />
                    {errors.contactEmail && (
                      <p className="text-rose-500 text-xs mt-1">{errors.contactEmail.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Số điện thoại</label>
                    <div className="relative">
                      <input
                        type="text"
                        {...control.register('contactPhone')}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-600"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5"/>
                    </div>
                    {errors.contactPhone && (
                      <p className="text-rose-500 text-xs mt-1">{errors.contactPhone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Danh sách hành khách */}
              {Array.from({length: passengerCount}, (_, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <h2
                    className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600"/> Hành khách {idx + 1} (Người lớn)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Danh xưng</label>
                      <select
                        {...control.register(`passengers.${idx}.title`)}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 bg-white outline-none focus:border-blue-600"
                      >
                        <option value="MR">Ông (Mr)</option>
                        <option value="MRS">Bà (Mrs)</option>
                        <option value="MS">Cô / Chị (Ms)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Họ (VD: PHAM)</label>
                      <input
                        type="text"
                        placeholder="PHAM"
                        {...control.register(`passengers.${idx}.lastName`)}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 uppercase font-medium outline-none focus:border-blue-600"
                      />
                      {errors.passengers?.[idx]?.lastName && (
                        <p className="text-rose-500 text-xs mt-1">{errors.passengers[idx]?.lastName?.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Tên đệm & Tên</label>
                      <input
                        type="text"
                        placeholder="VAN HAU"
                        {...control.register(`passengers.${idx}.firstName`)}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 uppercase font-medium outline-none focus:border-blue-600"
                      />
                      {errors.passengers?.[idx]?.firstName && (
                        <p className="text-rose-500 text-xs mt-1">{errors.passengers[idx]?.firstName?.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Ngày sinh</label>
                      <input
                        type="date"
                        {...control.register(`passengers.${idx}.dob`)}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Số CCCD / Hộ chiếu</label>
                      <input
                        type="text"
                        placeholder="07909500xxxx"
                        {...control.register(`passengers.${idx}.idNumber`)}
                        className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-600 font-mono"
                      />
                      {errors.passengers?.[idx]?.idNumber && (
                        <p className="text-rose-500 text-xs mt-1">{errors.passengers[idx]?.idNumber?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* 3. Dịch vụ bổ trợ (Ancillary) */}
              <AncillarySelector
                baggage={watchedBaggage}
                meal={watchedMeal}
                hasInsurance={watchedInsurance}
                onBaggageChange={(val) => setValue('baggage', val)}
                onMealChange={(val) => setValue('meal', val)}
                onInsuranceToggle={(val) => setValue('hasInsurance', val)}
              />
            </div>

            {/* Cột phải: Sticky Tóm tắt giỏ hàng & Chiết tính giá */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-black text-slate-900 text-base pb-3 border-b border-slate-100">
                  Chiết tính giá vé (Fare Breakdown)
                </h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Vé cơ bản ({passengerCount} khách):</span>
                    <span className="font-semibold text-slate-900">{formatVND(pricing.baseFare)} ₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thuế VAT & Phí sân bay:</span>
                    <span className="font-semibold text-slate-900">{formatVND(pricing.airportFeeAndTaxes)} ₫</span>
                  </div>
                  {pricing.baggageFee > 0 && (
                    <div className="flex justify-between text-blue-600">
                      <span>Hành lý thêm ({watchedBaggage}):</span>
                      <span className="font-semibold">+{formatVND(pricing.baggageFee)} ₫</span>
                    </div>
                  )}
                  {pricing.mealFee > 0 && (
                    <div className="flex justify-between text-blue-600">
                      <span>Suất ăn chọn thêm:</span>
                      <span className="font-semibold">+{formatVND(pricing.mealFee)} ₫</span>
                    </div>
                  )}
                  {pricing.insuranceFee > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Bảo hiểm FlightCare:</span>
                      <span className="font-semibold">+{formatVND(pricing.insuranceFee)} ₫</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-orange-500">
                        {formatVND(pricing.grandTotal)}
                      </span>
                      <span className="text-xs text-orange-400 font-semibold ml-1">₫</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all mt-4 text-sm"
                >
                  Tiến hành giữ chỗ & Tạo PNR <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
