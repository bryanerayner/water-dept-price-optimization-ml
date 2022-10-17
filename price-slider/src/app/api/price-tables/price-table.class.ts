import {
  ICustomer,
  ICustomerConsumptionHistory,
} from '../customer-data/customer-dataset.class';

export interface ICustomerMatchTest {
    columnName: string;
    equals?: string;
    contains?: string;
}

export class PriceTable {
  getCustomerCategory(
    customer: ICustomer,
    consumptionHistory: ICustomerConsumptionHistory
  ): string {
    throw new Error('Method not implemented.');
  }
  customerBelongsToPriceTable(customer: ICustomer): boolean {
    throw new Error('Method not implemented.');
  }

  constructor(
    public id: string,
    public customerMatchTests: ICustomerMatchTest[] = [],
    public brackets: Array<{
      min: number;
      max: number;
      costPerThousandGallons: number;
    }> = [],
    public baseFees: {
      [meterType: string]: number;
    } = {}
  ) {}

  calculatePrice(subunit: string, gallonsUsed: number): number {
    const base = this.baseFees?.[subunit];

    const totalPrice = this.calculatePerGallonPrice(gallonsUsed) + base;

    return totalPrice;
  }

  calculatePerGallonPrice(gallonsUsed: number) {
    // Make sure this is a number;
    gallonsUsed = parseInt(gallonsUsed + '');
    var totalPrice = 0;
    this.brackets.forEach(({ min, max, costPerThousandGallons }) => {
      if (gallonsUsed > min && gallonsUsed < max) {
        // This is the final value. We need to subtract from the max, and then price it at the rate per thousand.
        var gallonsOverStartOfRange = gallonsUsed - min;
        var toThousandsOfGallons = gallonsOverStartOfRange / 1000;
        var finalPrice = toThousandsOfGallons * costPerThousandGallons;
        totalPrice += finalPrice;
      } else if (gallonsUsed > min && gallonsUsed > max) {
        // We went way over this bracket. How many thousands of gallons does this bracket span? Let's use the entireity of this bracket
        // and include it.
        var gallonsInBracket = max - min;
        var thousandsOfGallonsInBracket = gallonsInBracket / 1000;
        var priceForBracket =
          thousandsOfGallonsInBracket * costPerThousandGallons;
        totalPrice += priceForBracket;
      }
    });
    return totalPrice;
  }

  calculateRevenueForMonth(
    customers: {
      category: string;
      gallonsUsed: number;
    }[]
  ): number {
    const total = customers.reduce((sum, nextCustomer) => {
      const customerRevenue = this.calculatePrice(
        nextCustomer.category,
        nextCustomer.gallonsUsed
      );

      return sum + customerRevenue;
    }, 0);
    return total;
  }

  calculateRevenueByMonth(
    customers: {
      category: string;
      gallonsUsed: number;
    }[][]
  ) {
    const revenueByMonth = customers.map((month) =>
      this.calculateRevenueForMonth(month)
    );

    return revenueByMonth;
  }
}
