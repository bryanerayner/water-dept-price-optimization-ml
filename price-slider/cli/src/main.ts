


import { PriceSchemeModel } from '../../src/app/models/price-scheme.model';
import {
  categories,
  newMonthlyMeterFee,
} from '../../src/app/models/compute-price';
import {
  getNewSimulatedCity
} from '../../src/app/models/get-sim-city';

const model = new PriceSchemeModel();

model.brackets = categories.new['insideResidential'];
model.baseFees = newMonthlyMeterFee;

const myWaterBill = model.calculatePrice('3/4', 7520)




console.log(`Bryan's water bill: `, myWaterBill );



const newSimCity = getNewSimulatedCity();
console.log(JSON.stringify(newSimCity, undefined, '  '));

