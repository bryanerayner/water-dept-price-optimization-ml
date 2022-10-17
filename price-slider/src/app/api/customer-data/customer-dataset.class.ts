
export interface ICustomer {
    id: string;
    identity: ICustomerIdentity;
    consumptionHistory: ICustomerConsumptionHistory[];
}

export interface ICustomerIdentity {
    id: string;
    name: string;
    address: string;
}

export interface ICustomerConsumptionHistory {
  meter: ICustomerWaterMeter;
  history: ICustomerUsageMonth[];
}

export interface ICustomerWaterMeter {
    waterMeterType: string;
}

export interface ICustomerUsageMonth {
    gallonsUsed: number;
    month: Date;
}

export class CustomerDataset {
    private _customers: ICustomer[] = [];

    get customers() {
        return [...this._customers];
    }
}
