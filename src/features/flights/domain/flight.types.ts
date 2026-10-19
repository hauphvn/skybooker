// --- 1. Raw Amadeus / NDC Data Models (Tầng dữ liệu thô từ bên thứ ba) ---
export interface RawAmadeusEndpointLocation {
  iataCode: string;
  terminal?: string;
  at: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ss
}

export interface RawAmadeusSegment {
  departure: RawAmadeusEndpointLocation;
  arrival: RawAmadeusEndpointLocation;
  carrierCode: 'VN' | 'VJ' | 'QH' | string;
  number: string;
  aircraft: {
    code: string; // ví dụ: 321 (A321), 787 (Boeing 787)
  };
  duration: string; // ISO 8601 Duration: PT2H15M
  numberOfStops: number;
}

export interface RawAmadeusItinerary {
  duration: string;
  segments: RawAmadeusSegment[];
}

export interface RawAmadeusPrice {
  currency: string;
  total: string;
  base: string;
  fees?: Array<{
    amount: string;
    type: 'AIRPORT_TAX' | 'SERVICE_FEE' | string;
  }>;
}

export interface RawAmadeusFlightOffer {
  id: string;
  source: 'GDS' | 'NDC';
  validatingAirlineCodes: string[];
  itineraries: RawAmadeusItinerary[];
  price: RawAmadeusPrice;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  numberOfBookableSeats: number;
}

// --- 2. Clean UI Domain Models (Tầng thực thể cho React UI) ---
export interface FlightSegment {
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  aircraftModel: string;
  departure: {
    airportCode: string;
    airportName: string;
    terminal?: string;
    time: string; // HH:mm
    date: string; // DD/MM/YYYY
  };
  arrival: {
    airportCode: string;
    airportName: string;
    terminal?: string;
    time: string; // HH:mm
    date: string; // DD/MM/YYYY
  };
  durationText: string; // 2h 15m
}

export interface FlightOfferUI {
  id: string;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  isDirect: boolean;
  stopCount: number;
  totalDuration: string;
  departureTime: string;
  arrivalTime: string;
  originIata: string;
  destinationIata: string;
  baseFare: number;
  taxAndFees: number;
  totalPrice: number;
  availableSeats: number;
  hasCheckedBaggage: boolean;
  segments: FlightSegment[];
}
