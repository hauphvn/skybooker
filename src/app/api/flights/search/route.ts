import { NextResponse } from 'next/server';
import { RawAmadeusFlightOffer } from '@/features/flights/domain/flight.types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = (searchParams.get('from') || 'SGN').toUpperCase();
  const to = (searchParams.get('to') || 'HAN').toUpperCase();
  const date = searchParams.get('date') || '2026-10-15';

  // Giả lập độ trễ truy vấn hệ thống phân phối toàn cầu GDS (1.2 giây)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const mockOffers: RawAmadeusFlightOffer[] = [
    {
      id: 'OFFER-VN248',
      source: 'GDS',
      validatingAirlineCodes: ['VN'],
      itineraries: [
        {
          duration: 'PT2H15M',
          segments: [
            {
              departure: { iataCode: from, terminal: '1', at: `${date}T08:00:00` },
              arrival: { iataCode: to, terminal: '2', at: `${date}T10:15:00` },
              carrierCode: 'VN',
              number: '248',
              aircraft: { code: '321' },
              duration: 'PT2H15M',
              numberOfStops: 0,
            },
          ],
        },
      ],
      price: {
        currency: 'VND',
        base: '1450000',
        total: '1850000',
        fees: [{ amount: '400000', type: 'AIRPORT_TAX' }],
      },
      pricingOptions: {
        fareType: ['PUBLISHED'],
        includedCheckedBagsOnly: true,
      },
      numberOfBookableSeats: 9,
    },
    {
      id: 'OFFER-VJ152',
      source: 'NDC',
      validatingAirlineCodes: ['VJ'],
      itineraries: [
        {
          duration: 'PT2H10M',
          segments: [
            {
              departure: { iataCode: from, terminal: '1', at: `${date}T06:15:00` },
              arrival: { iataCode: to, terminal: '1', at: `${date}T08:25:00` },
              carrierCode: 'VJ',
              number: '152',
              aircraft: { code: '320' },
              duration: 'PT2H10M',
              numberOfStops: 0,
            },
          ],
        },
      ],
      price: {
        currency: 'VND',
        base: '980000',
        total: '1240000',
        fees: [{ amount: '260000', type: 'AIRPORT_TAX' }],
      },
      pricingOptions: {
        fareType: ['LOW_COST'],
        includedCheckedBagsOnly: false,
      },
      numberOfBookableSeats: 4,
    },
    {
      id: 'OFFER-QH202',
      source: 'GDS',
      validatingAirlineCodes: ['QH'],
      itineraries: [
        {
          duration: 'PT2H15M',
          segments: [
            {
              departure: { iataCode: from, terminal: '1', at: `${date}T14:30:00` },
              arrival: { iataCode: to, terminal: '1', at: `${date}T16:45:00` },
              carrierCode: 'QH',
              number: '202',
              aircraft: { code: '321' },
              duration: 'PT2H15M',
              numberOfStops: 0,
            },
          ],
        },
      ],
      price: {
        currency: 'VND',
        base: '1250000',
        total: '1620000',
        fees: [{ amount: '370000', type: 'AIRPORT_TAX' }],
      },
      pricingOptions: {
        fareType: ['PUBLISHED'],
        includedCheckedBagsOnly: true,
      },
      numberOfBookableSeats: 6,
    },
    {
      id: 'OFFER-VN7204-1STOP',
      source: 'GDS',
      validatingAirlineCodes: ['VN'],
      itineraries: [
        {
          duration: 'PT4H30M',
          segments: [
            {
              departure: { iataCode: from, terminal: '1', at: `${date}T09:30:00` },
              arrival: { iataCode: 'DAD', terminal: '1', at: `${date}T10:50:00` },
              carrierCode: 'VN',
              number: '7204',
              aircraft: { code: '321' },
              duration: 'PT1H20M',
              numberOfStops: 0,
            },
            {
              departure: { iataCode: 'DAD', terminal: '1', at: `${date}T12:30:00` },
              arrival: { iataCode: to, terminal: '2', at: `${date}T14:00:00` },
              carrierCode: 'VN',
              number: '7188',
              aircraft: { code: '321' },
              duration: 'PT1H30M',
              numberOfStops: 0,
            },
          ],
        },
      ],
      price: {
        currency: 'VND',
        base: '1750000',
        total: '2350000',
        fees: [{ amount: '600000', type: 'AIRPORT_TAX' }],
      },
      pricingOptions: {
        fareType: ['PUBLISHED'],
        includedCheckedBagsOnly: true,
      },
      numberOfBookableSeats: 2,
    },
  ];

  return NextResponse.json({
    meta: {
      count: mockOffers.length,
      provider: 'Amadeus GDS / NDC Simulated Engine',
      currency: 'VND',
    },
    data: mockOffers,
  });
}
