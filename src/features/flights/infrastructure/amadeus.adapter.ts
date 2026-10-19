import {
  FlightOfferUI,
  FlightSegment,
  RawAmadeusFlightOffer,
  RawAmadeusSegment
} from "@/features/flights/domain/flight.types";

const AIRLINE_NAMES: Record<string, string> = {
  VN: 'Vietnam Airlines',
  VJ: 'VietJet Air',
  QH: 'Bamboo Airways',
}

const AIRPORT_NAMES: Record<string, string> = {
  SGN: 'Tân Sơn Nhất (TP.HCM)',
  HAN: 'Nội Bài (Hà Nội)',
  DAD: 'Đà Nẵng',
  PQC: 'Phú Quốc',
  VII: 'Vinh',
};

export class AmadeusFlightAdapter {
  /*
  * ISO 8601 (PT2H15M) => 2h 15m
  * */

  private static parseIsoDuration(durationIso: string): string {
    const match = durationIso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) {
      return durationIso;
    }

    const hours = match[1] ? `${match[1]}h ` : '';
    const minutes = match[2] ? `${match[2]}m` : '';
    return `${hours}${minutes}`.trim() ?? '0m';
  }


  /**
   * ISO datetime (2026-10-15T08:00:00) => { time: '08:00', date: '15/10/2026' }
   * @param isoString
   * @private
   */
  private static parseDateTime(isoString: string): { time: string; date: string } {
    const d = new Date(isoString);
    const time = d.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit', hour12: false});
    const date = d.toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'});
    return {time, date};
  }

  /**
   * Ánh xạ chi tiết từng chặng bay (segment)
   */
  private static mapSegment(rawSegment: RawAmadeusSegment): FlightSegment {
    const dept = this.parseDateTime(rawSegment.departure.at);
    const arr = this.parseDateTime(rawSegment.arrival.at);

    return {
      flightNumber: `${rawSegment.carrierCode} ${rawSegment.number}`,
      airlineCode: rawSegment.carrierCode,
      airlineName: AIRLINE_NAMES[rawSegment.carrierCode] || rawSegment.carrierCode,
      aircraftModel: `Airbus A${rawSegment.aircraft.code}`,
      departure: {
        airportCode: rawSegment.departure.iataCode,
        airportName: AIRPORT_NAMES[rawSegment.departure.iataCode] || rawSegment.departure.iataCode,
        terminal: rawSegment.departure.terminal,
        time: dept.time,
        date: dept.date,
      },
      arrival: {
        airportCode: rawSegment.arrival.iataCode,
        airportName: AIRPORT_NAMES[rawSegment.arrival.iataCode] || rawSegment.arrival.iataCode,
        terminal: rawSegment.arrival.terminal,
        time: arr.time,
        date: arr.date,
      },
      durationText: this.parseIsoDuration(rawSegment.duration),
    };

  }

  /**
   * Hàm chuyển đổi chính: Biến đổi mảng Raw Amadeus Offer thành mảng FlightOfferUI
   */
  public static toDomain(rawOffer: RawAmadeusFlightOffer): FlightOfferUI {
    const primaryItinerary = rawOffer.itineraries[0];
    const segments = primaryItinerary.segments.map((seg) => this.mapSegment(seg));

    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    const baseFare = parseInt(rawOffer.price.base, 10);
    const totalPrice = parseInt(rawOffer.price.total, 10);
    const taxAndFees = totalPrice - baseFare;

    return {
      id: rawOffer.id,
      airlineCode: rawOffer.validatingAirlineCodes[0] || firstSegment.airlineCode,
      airlineName: AIRLINE_NAMES[rawOffer.validatingAirlineCodes[0]] || firstSegment.airlineName,
      flightNumber: firstSegment.flightNumber,
      isDirect: segments.length === 1,
      stopCount: segments.length - 1,
      totalDuration: this.parseIsoDuration(primaryItinerary.duration),
      departureTime: firstSegment.departure.time,
      arrivalTime: lastSegment.arrival.time,
      originIata: firstSegment.departure.airportCode,
      destinationIata: lastSegment.arrival.airportCode,
      baseFare,
      taxAndFees,
      totalPrice,
      availableSeats: rawOffer.numberOfBookableSeats,
      hasCheckedBaggage: rawOffer.pricingOptions.includedCheckedBagsOnly,
      segments,
    };
  }

  public static toDomainList(rawOffers: RawAmadeusFlightOffer[]): FlightOfferUI[] {
    return rawOffers.map((offer) => this.toDomain(offer));
  }
}
