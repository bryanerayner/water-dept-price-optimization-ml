const categories: {
  [key: string]: {
    [key: string]: ReturnType<typeof gallonRange>[]
  };
} = {
  old: {},
  new: {},
};

const oldFlatRates: {
    [key:string]: number;
} = {
  insideResidential: 20,
  outsideResidential: 40,
  insideCommercial: 30,
  outsideCommercial: 55,
};

const newMonthlyMeterFee: {
    [key:string]: number;
} = {
  '3/4': 25,
  '1': 35,
  '1.5': 45,
  '2': 55,
  '3': 65,
  '4': 75,
  '6': 85,
};

function addCategory(oldOrNew:'old' | 'new', name: string, values: ReturnType<typeof gallonRange>[]) {
  categories[oldOrNew][name] = values;
}

function gallonRange(min:number, max: number, costPerThousandGallons: number) {
  return { min, max, costPerThousandGallons };
}

addCategory('new', 'insideResidential', [
  gallonRange(0, 2000, 3),
  gallonRange(2001, 4000, 4),
  gallonRange(4001, 6000, 5),
  gallonRange(6001, 8000, 6),
  gallonRange(8001, 10000, 7),
  gallonRange(10001, Infinity, 8),
]);
addCategory('new', 'outsideResidential', [
  gallonRange(0, 2000, 6),
  gallonRange(2001, 4000, 8),
  gallonRange(4001, 6000, 10),
  gallonRange(6001, 8000, 12),
  gallonRange(8001, 10000, 14),
  gallonRange(10001, Infinity, 16),
]);
addCategory('new', 'commercial', [
  gallonRange(0, 2000, 4),
  gallonRange(2001, 4000, 5),
  gallonRange(4001, 6000, 6),
  gallonRange(6001, 8000, 7),
  gallonRange(8001, 10000, 8),
  gallonRange(10001, Infinity, 9),
]);
addCategory('new', 'irrigation', [
  gallonRange(0, 2000, 4),
  gallonRange(2001, 4000, 5),
  gallonRange(4001, 6000, 6),
  gallonRange(6001, 8000, 7),
  gallonRange(8001, 10000, 8),
  gallonRange(10001, Infinity, 9),
]);

addCategory('old', 'insideResidential', [
  gallonRange(2001, 10_000, 3),
  gallonRange(10_001, 20_000, 3.75),
  gallonRange(20_001, 30_000, 4.6),
  gallonRange(30_001, Infinity, 5.5),
]);
addCategory('old', 'outsideResidential', [
  gallonRange(2001, 10_000, 4),
  gallonRange(10_001, 20_000, 5.5),
  gallonRange(20_001, 30_000, 7.1),
  gallonRange(30_001, Infinity, 8.75),
]);
addCategory('old', 'insideCommercial', [
  gallonRange(2001, 10_000, 3.5),
  gallonRange(10_001, 20_000, 4),
  gallonRange(20_001, 30_000, 4.85),
  gallonRange(30_001, Infinity, 5.35),
]);
addCategory('old', 'outsideCommercial', [
  gallonRange(2001, 10_000, 6),
  gallonRange(10_001, 20_000, 6.5),
  gallonRange(20_001, 30_000, 8.35),
  gallonRange(30_001, Infinity, 9.85),
]);

function calculatePerGallonPrice(oldOrNew: string, userCategory: string, gallonsUsed: number) {
  var category = categories[oldOrNew][userCategory];
  if (!category) {
    return Infinity;
  }
  // Make sure this is a number;
  gallonsUsed = parseInt(gallonsUsed + '');
  var totalPrice = 0;
  category.forEach(({ min, max, costPerThousandGallons }) => {
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

function calculateOldPrice(category: string, gallonsUsed: number) {
  if (gallonsUsed === 0) {
    return oldFlatRates[category];
  }
  var perGallonPrice = calculatePerGallonPrice('old', category, gallonsUsed);
  return oldFlatRates[category] + perGallonPrice;
}

function calculateNewPrice(category:string, meterType: string, gallonsUsed: number) {
  var meterTypePrice = newMonthlyMeterFee[meterType];
  var perGallonPrice = calculatePerGallonPrice('new', category, gallonsUsed);
  return meterTypePrice + perGallonPrice;
}

