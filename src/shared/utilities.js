import { isNaN, isNumber } from 'lodash';

/**
 * {@link https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string}
 */
export const roundNumber = (number) => Math.round(number * 1e2) / 1e2;

export const pmt = (rate, numberOfPayments, loan, futureValue) => {
  const pv = parseFloat(loan);
  const i = parseFloat(rate) / 1200;
  const n = parseFloat(numberOfPayments) * 12;
  const fv = parseFloat(futureValue);
  const result = (pv - (fv / (1 + i) ** n)) / ((1 - (1 / (1 + i) ** n)) / i);

  if (isNaN(result)) {
    return 0;
  }

  return result;
};

/**
 * Formats an amount to dollars e.g. `10000` becomes `$10,000.00`
 * @param {number} amount The amount to be formatted in dollars
 * @param {number} maximumFractionDigits Optional. The fraction digits. Defaults to 2.
 * @return {string} The formatted dollars
 */
export const formatInDollars = (amount, maximumFractionDigits = 2) => new Intl.NumberFormat(
  'en-US',
  { style: 'currency', currency: 'USD', maximumFractionDigits },
).format(amount);

/**
 * Bad explanation follows:
 * Given an array, this function calculates the sum of an array item's property.
 * The property has to be of type number
 * @param {array} arr The array
 * @param {string} property The name of the property
 * @return {number} The sum of property values
 */
export const getSumOfArrayProperty = (arr, property) => (arr || [])
  .map((arrayItem) => {
    if (!isNumber(arrayItem[property])) {
      throw new Error('The array item\'s property is not a number!');
    }

    return arrayItem[property];
  })
  .reduce((prev, next) => prev + next, 0);
