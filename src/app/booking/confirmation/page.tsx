// src/app/booking/confirmation/page.tsx
'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Check, CheckCircle2, Clock, Copy, CreditCard, QrCode, ShieldCheck, Wallet} from 'lucide-react';
import {useBookingStore} from '@/features/booking/store/booking.store';
import {useCountdownTimer} from '@/shared/hooks/useCountdownTimer';
import {FareCalculatorContext} from "@/features/booking/domain/pricing/strategies";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const {
    pnr,
    holdExpiresAt,
    passengers,
    baseFare,
    ancillary,
    contactEmail,
    resetBooking
  } = useBookingStore();

  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'card' | 'momo'>('vietqr');
  const [isPaid, setIsPaid] = useState(false);

  // Mốc giữ vé dự phòng: chỉ tính 1 lần ở client.
  // Không gọi Date.now() khi prerender (server) vì Cache Components sẽ chặn build.
  const [fallbackHoldExpiry] = useState<number | null>(() =>
    typeof window !== 'undefined' ? Date.now() + 15 * 60 * 1000 : null
  );
  const targetTimestamp = holdExpiresAt ?? fallbackHoldExpiry;

  // Hook đếm ngược 15 phút
  const {formatted, isExpired, isMounted, isReady} = useCountdownTimer({
    targetTimestamp,
    onExpire: () => {
      // Logic xử lý khi quá hạn giữ vé
    },
  });

  // Tính lại tổng tiền quyết toán bằng Strategy Pattern
  const calculator = new FareCalculatorContext();
  const pricing = calculator.calculateTotal(
    baseFare || 1450000,
    passengers.length || 1,
    ancillary.baggage,
    ancillary.meal,
    ancillary.hasInsurance
  );

  const displayPnr = pnr || 'VN889A';
  const formatVND = (num: number) => new Intl.NumberFormat('vi-VN').format(num);

  const handleCopyPnr = () => {
    navigator.clipboard.writeText(displayPnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsPaid(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Header Status */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div
            className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8"/>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isPaid ? 'Xuất vé điện tử thành công!' : 'Đặt chỗ thành công - Đang giữ vé'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mã xác nhận và vé điện tử E-ticket đã được đồng bộ tới email{' '}
            <span className="font-semibold text-slate-700">{contactEmail || 'khachhang@gmail.com'}</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Countdown Timer Banner */}
        {!isPaid && (
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
              isExpired
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${isExpired ? 'text-rose-600' : 'text-amber-600 animate-pulse'}`}/>
              <div>
                <span className="text-sm font-bold block">
                  {isExpired ? 'Thời gian giữ chỗ đã hết hạn' : 'Thời hạn thanh toán giữ chỗ (Hold-time):'}
                </span>
                <span className="text-xs opacity-80">
                  {isExpired
                    ? 'Giá vé có thể thay đổi. Vui lòng thực hiện tìm kiếm lại chuyến bay.'
                    : 'Vé sẽ tự động hủy nếu không hoàn tất thanh toán trước khi hết giờ.'
                  }
                </span>
              </div>
            </div>

            <div
              className="font-mono text-2xl font-black tracking-wider bg-white/80 px-4 py-1.5 rounded-xl border border-amber-200/50 shadow-sm">
              {isMounted && isReady ? formatted : '15:00'}
            </div>
          </div>
        )}

        {/* PNR & Booking Overview Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Mã đặt chỗ hàng không (PNR)
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl md:text-4xl font-black text-blue-700 tracking-widest">
                  {displayPnr}
                </span>
                <button
                  type="button"
                  onClick={handleCopyPnr}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  title="Sao chép PNR"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600"/> : <Copy className="w-4 h-4"/>}
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}/>
                {isPaid ? 'ĐÃ XUẤT VÉ (ISSUED)' : 'CHỜ THANH TOÁN (HOLDING)'}
              </span>
              <div className="text-xs text-slate-400 mt-1 font-medium">Hãng: Vietnam Airlines • Chặng SGN - HAN</div>
            </div>
          </div>

          {/* Passenger & Ancillary Specs */}
          <div className="py-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Danh sách hành khách:</span>
              {passengers.length > 0 ? (
                passengers.map((p, idx) => (
                  <div key={idx} className="font-bold text-slate-800 text-sm">
                    {idx + 1}. {p.title} {p.lastName} {p.firstName}
                    <span className="text-xs font-normal text-slate-500 ml-2">({p.idNumber})</span>
                  </div>
                ))
              ) : (
                <div className="font-bold text-slate-800 text-sm">1. MR PHAM VAN HAU</div>
              )}
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Dịch vụ bổ trợ đã chọn:</span>
              <div className="font-semibold text-slate-700 space-y-0.5">
                <p>• Hành lý ký gửi: <span className="text-blue-600 font-bold">{ancillary.baggage}</span></p>
                <p>• Suất ăn: <span
                  className="text-blue-600 font-bold">{ancillary.meal === 'NONE' ? 'Không' : ancillary.meal}</span></p>
                <p>• Bảo hiểm du lịch: <span
                  className="text-emerald-600 font-bold">{ancillary.hasInsurance ? 'Có bảo hiểm' : 'Không'}</span></p>
              </div>
            </div>
          </div>

          {/* Payment Gateway Section */}
          {!isPaid ? (
            <div className="pt-6 space-y-6">
              <h2 className="font-bold text-slate-900 text-base">Chọn phương thức thanh toán</h2>

              <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('vietqr')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'vietqr'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-blue-600"/>
                  <span>VietQR Pro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-slate-700"/>
                  <span>Thẻ Visa / Master</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'momo'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-pink-600"/>
                  <span>Ví MoMo / ZaloPay</span>
                </button>
              </div>

              {/* VietQR Dynamic Presentation */}
              {paymentMethod === 'vietqr' && (
                <div
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                  {/* Generated QR Code Frame */}
                  <div
                    className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <img
                      src={`https://api.vietqr.io/image/970422-0967900801-compact2.jpg?amount=${pricing.grandTotal}&addInfo=envietbooker%20${displayPnr}&accountName=envietbooker%20OTA`}
                      alt="VietQR Payment Gateway"
                      className="w-48 h-48 rounded-xl object-contain"
                    />
                    <span className="text-[10px] font-bold text-slate-400 mt-2">Quét bằng ứng dụng Ngân hàng</span>
                  </div>

                  {/* Transfer Details info */}
                  <div className="flex-1 space-y-2.5 text-xs text-slate-600 w-full">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span>Ngân hàng thụ hưởng:</span>
                      <span className="font-bold text-slate-900">MB Bank (Quân Đội)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span>Số tài khoản:</span>
                      <span className="font-mono font-bold text-slate-900">0967900801</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span>Số tiền cần thanh toán:</span>
                      <span className="font-bold text-orange-600 text-sm">{formatVND(pricing.grandTotal)} ₫</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span>Nội dung chuyển khoản:</span>
                      <span className="font-mono font-extrabold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        envietbooker {displayPnr}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic pt-1">
                      Hệ thống tự động kích hoạt xuất vé điện tử sau 30-60 giây kể từ khi nhận được giao dịch.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button: Simulate Payment */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 text-base transition-all"
              >
                Xác nhận đã chuyển khoản ({formatVND(pricing.grandTotal)} ₫)
              </button>
            </div>
          ) : (
            /* Post-Payment Success View */
            <div className="pt-6 space-y-4 text-center">
              <div
                className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-sm font-semibold flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600"/>
                Giao dịch hợp lệ. Vé điện tử đang ở trạng thái sẵn sàng bay.
              </div>

              <div className="pt-2 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    resetBooking();
                    router.push('/');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-blue-600/20 text-sm transition-all"
                >
                  Về trang chủ tìm chuyến bay mới
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
