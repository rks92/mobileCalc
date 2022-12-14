export const taxRateByState = {
  Hawaii: 0.28,
  Alabama: 0.41,
  Colorado: 0.51,
  Louisiana: 0.55,
  'District of Columbia': 0.56,
  'South Carolina': 0.57,
  Delaware: 0.57,
  'West Virginia': 0.58,
  Nevada: 0.60,
  Wyoming: 0.61,
  Arkansas: 0.62,
  Utah: 0.63,
  Arizona: 0.66,
  Idaho: 0.69,
  Tennessee: 0.71,
  California: 0.76,
  'New Mexico': 0.80,
  Mississippi: 0.81,
  Virginia: 0.82,
  Montana: 0.84,
  'North Carolina': 0.84,
  Indiana: 0.85,
  Kentucky: 0.86,
  Florida: 0.89,
  Oklahoma: 0.90,
  Georgia: 0.92,
  Missouri: 0.97,
  Oregon: 0.97,
  'North Dakota': 0.98,
  Washington: 0.98,
  Maryland: 1.09,
  Minnesota: 1.12,
  Alaska: 1.19,
  Massachusetts: 1.23,
  'South Dakota': 1.31,
  Maine: 1.36,
  Kansas: 1.41,
  Michigan: 1.54,
  Ohio: 1.56,
  Iowa: 1.57,
  Pennsylvania: 1.58,
  'Rhode Island': 1.63,
  'New York': 1.72,
  Nebraska: 1.73,
  Texas: 1.80,
  Wisconsin: 1.85,
  Vermont: 1.90,
  Connecticut: 2.14,
  'New Hampshire': 2.18,
  Illinois: 2.27,
  'New Jersey': 2.49,
};

export const getTaxRateMultiplierForState = (state) => taxRateByState[state] / 100;

export const INITIAL_PURCHASE_PRICE = 100_000;
export const INITIAL_MONTHLY_RENT = 1000;
