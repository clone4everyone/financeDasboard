"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TransactionData {
  inflow: {
    amount: number;
    unit: string;
    transactions: number;
    change: number;
  };
  outflow: {
    amount: number;
    unit: string;
    transactions: number;
    change: number;
  };
  status: {
    pending: number;
    expired: number;
    reviewed: number;
  };
}

export function TransactionSnapshot() {
  const [data, setData] = useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-24 bg-muted rounded mb-4"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Transaction Snapshot</CardTitle>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">Online</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">Offline</span>
          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded">Today</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inflow and Outflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">INFLOW</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {data.inflow.amount} {data.inflow.unit}
              </span>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{data.inflow.change}%
              </div>
            </div>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
              {data.inflow.transactions} Transactions
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">OUTFLOW</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {data.outflow.amount} {data.outflow.unit}
              </span>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                {data.outflow.change}%
              </div>
            </div>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">
              {data.outflow.transactions} Transactions
            </p>
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">STATUS</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{data.status.pending}</div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">PENDING</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-700 dark:text-gray-300">{data.status.expired}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">EXPIRED</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{data.status.reviewed}</div>
              <div className="text-xs text-green-600 dark:text-green-400">REVIEWED</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}