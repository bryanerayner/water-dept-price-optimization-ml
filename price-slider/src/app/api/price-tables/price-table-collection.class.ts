import { CustomerDataset } from '../customer-data/customer-dataset.class';
import { PriceTable } from './price-table.class';
import * as _ from 'lodash';
import { isBefore, isAfter } from 'date-fns';

export class PriceTableCollection {
  priceTables = new Map<string, PriceTable>();

  calculateRevenueForMonth(
    customers: {
      model: string;
      category: string;
      gallonsUsed: number;
    }[]
  ): number {
    const customersByModel = _.groupBy(customers, 'model');
    let total = 0;
    for (let customer in customersByModel) {
      const model = this.priceTables.get(customer);
      if (model) {
        const next = model.calculateRevenueForMonth(customersByModel[customer]);
        total += next;
      }
    }
    return total;
  }

  calculateRevenueByMonth(customers: CustomerDataset): {
    month: Date,
    revenue: number
  } {
    let minMonth: Date = new Date(2100, 1, 1);
    let maxMondh: Date = new Date(1800, 1, 1);

    const usageByModelAndCategory = new Map<string, Map<string, Array<{month: Date; gallonsUsed: number}>>>();

    customers.customers.forEach((customer) => {
    
        customer.consumptionHistory.forEach((h) => {
        let matchingPriceTable: PriceTable | null = null;

      this.priceTables.forEach((priceTable) => {

        if (priceTable.customerBelongsToPriceTable(customer)) {
          if (matchingPriceTable) {
            throw new Error(
              `Customer ${customer.id} belongs to more than one price table! Ensure your match rules don't conflict`
            );
          }
          matchingPriceTable = priceTable;
        }});

        matchingPriceTable = matchingPriceTable!;
        if (!matchingPriceTable) {
            throw new Error(`Customer ${customer.id} belongs to more than one price table! Ensure your match rules don't conflict`)
        }

        let usageByModel = usageByModelAndCategory.get(matchingPriceTable.id);
        if (!usageByModel) {
            usageByModel = new Map<string, Array<{month: Date; gallonsUsed: number}>>();
            usageByModelAndCategory.set(matchingPriceTable.id, usageByModel);
        }
        let usageByCategory = usageByModel.get(matchingPriceTable.id);
        if (!usageByCategory) {
            usageByCategory = [];
            usageByModel.set(matchingPriceTable.getCustomerCategory(customer, h), usageByCategory);
        }

        h.history.forEach(v => {
            if (isBefore(v.month, minMonth)) {
                minMonth = v.month
            };
            if (isAfter(v.month, minMonth)) {
                minMonth = v.month
            };
            usageByCategory?.push(v);
        });

    });
});

    
    const revenueByMonth = customersByModel.map((month) =>
      this.calculateRevenueForMonth(month)
    );

    return revenueByMonth;
  }
}
