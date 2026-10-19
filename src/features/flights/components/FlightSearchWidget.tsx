// src/features/flights/components/FlightSearchWidget.tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowRightLeft, Calendar, Search } from 'lucide-react';
import { flightSearchSchema, FlightSearchFormValues } from '../domain/search.schema';
import { AirportSelector } from './AirportSelector';
import { PassengerCounter } from './PassengerCounter';

export function FlightSearchWidget() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FlightSearchFormValues>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      tripType: 'roundTrip',
      origin: 'SGN',
      destination: 'HAN',
      departureDate: new Date('2026-10-20'),
      returnDate: new Date('2026-10-25'),
      passengers: { adults: 1, children: 0, infants: 0 },
      seatClass: 'ECONOMY',
    },
  });

  const tripType = watch('tripType');
  const origin = watch('origin');
  const destination = watch('destination');
  const seatClass = watch('seatClass');

  const handleSwapAirports = () => {
    setValue('origin', destination);
    setValue('destination', origin);
  };

  const onSubmit = (data: FlightSearchFormValues) => {
    const query = new URLSearchParams({
      from: data.origin,
      to: data.destination,
      deptDate: format(data.departureDate, 'yyyy-MM-dd'),
      adults: data.passengers.adults.toString(),
      children: data.passengers.children.toString(),
      infants: data.passengers.infants.toString(),
      seatClass: data.seatClass,
    });

    if (data.tripType === 'roundTrip' && data.returnDate) {
      query.set('returnDate', format(data.returnDate, 'yyyy-MM-dd'));
    }

    router.push(`/flights?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-5"
    >
      {/* Trip Type Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-100 pb-4 text-sm font-semibold">
        <label className="flex items-center gap-2 cursor-pointer text-slate-700">
          <input
            type="radio"
            value="roundTrip"
            checked={tripType === 'roundTrip'}
            onChange={() => setValue('tripType', 'roundTrip')}
            className="w-4 h-4 accent-blue-600"
          />
          Khứ hồi
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-700">
          <input
            type="radio"
            value="oneWay"
            checked={tripType === 'oneWay'}
            onChange={() => setValue('tripType', 'oneWay')}
            className="w-4 h-4 accent-blue-600"
          />
          Một chiều
        </label>
      </div>

      {/* Main Search Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Origin & Destination with Swap */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2 relative">
          <Controller
            control={control}
            name="origin"
            render={({ field }) => (
              <AirportSelector
                error={errors.origin?.message}
                label="Điểm cất cánh"
                onChange={field.onChange}
                type="origin"
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="destination"
            render={({ field }) => (
              <AirportSelector
                error={errors.destination?.message}
                label="Điểm hạ cánh"
                onChange={field.onChange}
                type="destination"
                value={field.value}
              />
            )}
          />

          <button
            type="button"
            onClick={handleSwapAirports}
            title="Đổi chiều chặng bay"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 flex items-center justify-center transition-all z-10 shadow-sm"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Departure Date / Return Date */}
        <div className="md:col-span-4 grid grid-cols-2 gap-2">
          <Controller
            control={control}
            name="departureDate"
            render={({ field }) => (
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Ngày đi
                </span>
                <input
                  type="date"
                  value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                  className="font-bold text-sm text-slate-900 mt-1 outline-none w-full bg-transparent"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="returnDate"
            render={({ field }) => (
              <div
                className={`p-3.5 rounded-xl border border-slate-200 bg-white transition-opacity ${
                  tripType === 'oneWay' ? 'opacity-40 pointer-events-none' : ''
                }`}
              >
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Ngày về
                </span>
                <input
                  type="date"
                  disabled={tripType === 'oneWay'}
                  value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                  className="font-bold text-sm text-slate-900 mt-1 outline-none w-full bg-transparent"
                />
              </div>
            )}
          />
        </div>

        {/* Passengers & Cabin Class */}
        <div className="md:col-span-3">
          <Controller
            control={control}
            name="passengers"
            render={({ field }) => (
              <PassengerCounter
                onChange={field.onChange}
                onSeatClassChange={(sc) => setValue('seatClass', sc)}
                seatClass={seatClass}
                value={field.value}
                error={errors.passengers?.infants?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 text-base transition-all"
        >
          <Search className="w-3.5 h-3.5" /> Tìm chuyến bay phù hợp
        </button>
      </div>
    </form>
  );
}
