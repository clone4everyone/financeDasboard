import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simulate market data with some basic conditional logic
  const baseNSE = 8625.70;
  const baseBSE = 27930.21;
  
  // Simulate market fluctuations
  const nseChange = (Math.random() - 0.5) * 50; // Random change between -25 to +25
  const bseChange = (Math.random() - 0.5) * 100; // Random change between -50 to +50
  
  const nseValue = baseNSE + nseChange;
  const bseValue = baseBSE + bseChange;
  
  // Calculate percentage changes
  const nsePercentChange = (nseChange / baseNSE) * 100;
  const bsePercentChange = (bseChange / baseBSE) * 100;
  
  const marketData = {
    nse: {
      value: nseValue,
      change: nsePercentChange,
      isPositive: nsePercentChange >= 0,
      yesterdaysSales: 50234,
      todaysAUM: 20.45
    },
    bse: {
      value: bseValue,
      change: bsePercentChange,
      isPositive: bsePercentChange >= 0
    },
    timestamp: new Date().toISOString()
  };

  res.status(200).json(marketData);
}