// Worked example used on the landing page. It matches the numbers in the
// Zeno dashboard designs: $3,440 lost today against a $5,000 daily limit,
// and an XAUUSD buy whose stop risks about $1,617 per lot.
export const guardExample = {
  symbol: 'XAUUSD',
  dailyLimit: 5000,
  lossToday: 3440,
  riskPerLot: (5380 - 3440) / 1.2
};

export interface GuardVerdict {
  lots: number;
  projectedLoss: number;
  allowed: boolean;
  headroom: number;
  maxLots: number;
}

export function checkTrade(lots: number, example = guardExample): GuardVerdict {
  const risk = lots * example.riskPerLot;
  const projectedLoss = Math.round(example.lossToday + risk);
  const headroom = example.dailyLimit - example.lossToday;
  const maxLots = Math.floor((headroom / example.riskPerLot) * 100) / 100;
  return {
    lots,
    projectedLoss,
    allowed: projectedLoss <= example.dailyLimit,
    headroom,
    maxLots
  };
}

export const usd = (value: number) => `$${Math.round(value).toLocaleString('en-US')}`;
