import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simulate some processing time
  const transactionData = {
    inflow: {
      amount: 5.20,
      unit: 'Crore',
      transactions: 60,
      change: 8.5
    },
    outflow: {
      amount: 3.20,
      unit: 'Crore',
      transactions: 24,
      change: -4.2
    },
    status: {
      pending: 150,
      expired: 36,
      reviewed: 15
    },
    timestamp: new Date().toISOString()
  };

  res.status(200).json(transactionData);
}