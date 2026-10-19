// src/features/booking/domain/pricing.strategy.ts

export type BaggageOption = '0kg' | '20kg' | '30kg';
export type MealOption = 'NONE' | 'HOT_MEAL' | 'SNACK';

export interface PricingBreakdown {
  baseFare: number;
  airportFeeAndTaxes: number;
  baggageFee: number;
  mealFee: number;
  insuranceFee: number;
  grandTotal: number;
}

// 1. Tax & Airport Fee Strategy
export interface TaxPricingStrategy {
  calculate(baseFare: number, passengerCount: number): number;
}

export class DomesticStandardTaxStrategy implements TaxPricingStrategy {
  private readonly VAT_RATE = 0.1; // 10% VAT vé máy bay
  private readonly AIRPORT_SECURITY_FEE = 120_000; // Phí soi chiếu an ninh & dịch vụ sân bay

  calculate(baseFare: number, passengerCount: number): number {
    const vat = baseFare * this.VAT_RATE;
    return (vat + this.AIRPORT_SECURITY_FEE) * passengerCount;
  }
}

// 2. Ancillary Pricing Strategy (Hành lý, Suất ăn, Bảo hiểm)
export class AncillaryPricingStrategy {
  private static readonly BAGGAGE_RATES: Record<BaggageOption, number> = {
    '0kg': 0,
    '20kg': 220_000,
    '30kg': 360_000,
  };

  private static readonly MEAL_RATES: Record<MealOption, number> = {
    NONE: 0,
    HOT_MEAL: 85_000,
    SNACK: 45_000,
  };

  private static readonly INSURANCE_FEE_PER_PAX = 55_000;

  static getBaggagePrice(tier: BaggageOption): number {
    return this.BAGGAGE_RATES[tier] ?? 0;
  }

  static getMealPrice(tier: MealOption): number {
    return this.MEAL_RATES[tier] ?? 0;
  }

  static getInsurancePrice(hasInsurance: boolean, passengerCount: number): number {
    return hasInsurance ? this.INSURANCE_FEE_PER_PAX * passengerCount : 0;
  }
}

// 3. Pricing Context: Tổng hợp toàn bộ chi phí
export class FareCalculatorContext {
  private taxStrategy: TaxPricingStrategy;

  constructor(taxStrategy: TaxPricingStrategy = new DomesticStandardTaxStrategy()) {
    this.taxStrategy = taxStrategy;
  }

  public calculateTotal(
    baseFarePerPax: number,
    passengerCount: number,
    baggage: BaggageOption,
    meal: MealOption,
    hasInsurance: boolean
  ): PricingBreakdown {
    const totalBaseFare = baseFarePerPax * passengerCount;
    const taxes = this.taxStrategy.calculate(baseFarePerPax, passengerCount);
    const baggageTotal = AncillaryPricingStrategy.getBaggagePrice(baggage) * passengerCount;
    const mealTotal = AncillaryPricingStrategy.getMealPrice(meal) * passengerCount;
    const insuranceTotal = AncillaryPricingStrategy.getInsurancePrice(hasInsurance, passengerCount);

    const grandTotal = totalBaseFare + taxes + baggageTotal + mealTotal + insuranceTotal;

    return {
      baseFare: totalBaseFare,
      airportFeeAndTaxes: taxes,
      baggageFee: baggageTotal,
      mealFee: mealTotal,
      insuranceFee: insuranceTotal,
      grandTotal,
    };
  }
}
