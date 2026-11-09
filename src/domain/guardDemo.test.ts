import { checkTrade, usd } from './guardDemo';

describe('guard demo', () => {
  it('blocks 1.20 lots and allows 0.80 lots against the $5,000 daily limit', () => {
    const blocked = checkTrade(1.2);
    expect(blocked.projectedLoss).toBe(5380);
    expect(blocked.allowed).toBe(false);

    const fits = checkTrade(0.8);
    expect(fits.allowed).toBe(true);
    expect(fits.projectedLoss).toBeLessThan(5000);
    expect(fits.headroom).toBe(1560);
    expect(fits.maxLots).toBe(0.96);
    expect(checkTrade(fits.maxLots).allowed).toBe(true);
  });

  it('formats dollars', () => {
    expect(usd(5380)).toBe('$5,380');
  });
});
