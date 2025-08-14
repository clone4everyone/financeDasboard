import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { scheme } = req.query;
  
  const allInvestors = [
    {
      id: 1,
      name: 'Ramesh Shankar',
      email: 'ramesh@example.com',
      scheme: 'HDFC Equity Fund',
      investment: 125000,
      returns: 15.2,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Dinesh Kumar',
      email: 'dinesh@example.com',
      scheme: 'HDFC Advantage Fund',
      investment: 250000,
      returns: 12.8,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Trilka Sant',
      email: 'trilka@example.com',
      scheme: 'HDFC Balanced Fund',
      investment: 180000,
      returns: 10.5,
      status: 'Pending'
    },
    {
      id: 4,
      name: 'S.K. Paul',
      email: 'skpaul@example.com',
      scheme: 'HDFC Capital Builder Fund',
      investment: 320000,
      returns: 14.7,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Mahesh Bhatkar',
      email: 'mahesh@example.com',
      scheme: 'HDFC Core Satellite Fund',
      investment: 150000,
      returns: 11.2,
      status: 'Active'
    },
  ];

  let filteredInvestors = allInvestors;
  
  if (scheme && typeof scheme === 'string') {
    filteredInvestors = allInvestors.filter(investor => 
      investor.scheme.toLowerCase().includes(scheme.toLowerCase())
    );
  }

  res.status(200).json({
    investors: filteredInvestors,
    total: filteredInvestors.length,
    scheme: scheme || 'all'
  });
}