/**
 * {@link https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string}
 */
export const roundNumber = (number) => Math.round(number * 1e2) / 1e2;

export const pmt = (rate, numberOfPayments, loan, futureValue) => {
  const pv = parseFloat(loan);
  const i = parseFloat(rate) / 1200;
  const n = parseFloat(numberOfPayments) * 12;
  const fv = parseFloat(futureValue);
  return (pv - (fv / (1 + i) ** n)) / ((1 - (1 / (1 + i) ** n)) / i);
};

export const formatInCurrency = (number) => new Intl.NumberFormat(
  'en-US',
  { style: 'currency', currency: 'USD' },
).format(number);
