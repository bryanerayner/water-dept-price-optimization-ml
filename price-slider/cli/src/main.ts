


import { MultiPriceSchemeModel, PriceSchemeModel } from '../../src/app/models/price-scheme.model';
import {
  categories,
  newMonthlyMeterFee,
} from '../../src/app/models/compute-price';
import {
  getNewSimulatedCity
} from '../../src/app/models/get-sim-city';



const models = [
    
    'insideResidential',
    'outsideResidential',
    'insideCommercial',
    'outsideCommercial'
];

const newPriceSchemes = new MultiPriceSchemeModel();

models.forEach((value, index) => {
    
    const model = new PriceSchemeModel();
    model.brackets = categories.new[value];
    model.baseFees = newMonthlyMeterFee;
    newPriceSchemes.models.set(index, model);
});

const newSimCity = getNewSimulatedCity();



