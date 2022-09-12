

export class PriceSchemeModel {

    priceUnit: 'thousands-of-gallons' = 'thousands-of-gallons';

    basePrice: number = 0;

    startingBracket: number = 0;

    brackets: {
        size: number;
        price: number;
    }[] = [];



}
