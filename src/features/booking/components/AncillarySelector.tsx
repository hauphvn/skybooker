// src/features/booking/components/AncillarySelector.tsx
'use client';

import {Luggage, ShieldCheck, Utensils} from 'lucide-react';
import {BaggageOption, MealOption} from "@/features/booking/domain/pricing/strategies";

interface AncillarySelectorProps {
  baggage: BaggageOption;
  meal: MealOption;
  hasInsurance: boolean;
  onBaggageChange: (val: BaggageOption) => void;
  onMealChange: (val: MealOption) => void;
  onInsuranceToggle: (val: boolean) => void;
}

export function AncillarySelector({
                                    baggage,
                                    meal,
                                    hasInsurance,
                                    onBaggageChange,
                                    onMealChange,
                                    onInsuranceToggle,
                                  }: AncillarySelectorProps) {
  return (
    <div className="space-y-6">
      {/* 1. Mua thêm Hành lý ký gửi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Luggage className="w-5 h-5 text-blue-600"/>
          <h3 className="font-bold text-slate-900 text-base">Hành lý ký gửi mua thêm</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {id: '0kg', title: '0 kg', price: '0 ₫', desc: 'Đã gồm 7kg xách tay'},
            {id: '20kg', title: '+20 kg', price: '220.000 ₫', desc: 'Gói phổ biến nhất'},
            {id: '30kg', title: '+30 kg', price: '360.000 ₫', desc: 'Thoải mái cho kỳ nghỉ'},
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onBaggageChange(item.id as BaggageOption)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                baggage === item.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-extrabold text-slate-900 text-base">{item.title}</div>
              <div className="text-blue-600 font-bold text-sm my-1">{item.price}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Suất ăn trên chuyến bay */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Utensils className="w-5 h-5 text-blue-600"/>
          <h3 className="font-bold text-slate-900 text-base">Suất ăn trên máy bay</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {id: 'NONE', title: 'Không chọn', price: '0 ₫', desc: 'Tiết kiệm chi phí'},
            {id: 'SNACK', title: 'Bánh mỳ & Nước suối', price: '45.000 ₫', desc: 'Phục vụ sau cất cánh'},
            {id: 'HOT_MEAL', title: 'Cơm nóng sốt bò', price: '85.000 ₫', desc: 'Kèm nước hoa quả tươi'},
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onMealChange(item.id as MealOption)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                meal === item.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-extrabold text-slate-900 text-base">{item.title}</div>
              <div className="text-blue-600 font-bold text-sm my-1">{item.price}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Bảo hiểm trễ chuyến & y tế */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <label className="flex items-start gap-3.5 cursor-pointer">
          <input
            type="checkbox"
            checked={hasInsurance}
            onChange={(e) => onInsuranceToggle(e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded accent-blue-600"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600"/> Bảo hiểm du lịch FlightCare
              </span>
              <span className="font-extrabold text-blue-600 text-sm">+55.000 ₫ / khách</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Bồi thường lên tới 10.000.000 ₫ đối với trường hợp trễ chuyến từ 2 tiếng, thất lạc hành lý hoặc hỗ trợ y
              tế khẩn cấp.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
