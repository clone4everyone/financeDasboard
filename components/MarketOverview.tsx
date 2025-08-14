"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MarketData {
  nse: {
    value: number;
    change: number;
    isPositive: boolean;
    yesterdaysSales: number;
    todaysAUM: number;
  };
  bse: {
    value: number;
    change: number;
    isPositive: boolean;
  };
}

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = () => {
      fetch('/api/market-summary')
        .then(res => res.json())
        .then(data => {
          setMarketData(data);
          setLoading(false);
        });
    };

    fetchMarketData();
    // Update market data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!marketData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Market Overview</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* NSE Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">NSE</span>
                </div>
                <div className="text-lg font-semibold">NSE</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold">{marketData.nse.value.toFixed(2)}</div>
                <div className={`flex items-center gap-1 text-sm ${
                  marketData.nse.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {marketData.nse.isPositive ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  {marketData.nse.change.toFixed(2)}% ({marketData.nse.change > 0 ? '+' : ''}{marketData.nse.change.toFixed(2)})
                </div>
              </div>

              <div className="pt-3 border-t border-border/50">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Yesterday's Sales</span>
                    <span className="font-medium">₹ {marketData.nse.yesterdaysSales.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    (1.0%)
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Today's AUM</span>
                    <span className="font-medium">₹ {marketData.nse.todaysAUM} Cr</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BSE Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">BSE</span>
                </div>
                <div className="text-lg font-semibold">BSE</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold">{marketData.bse.value.toFixed(2)}</div>
                <div className={`flex items-center gap-1 text-sm ${
                  marketData.bse.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {marketData.bse.isPositive ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  {Math.abs(marketData.bse.change).toFixed(2)}% ({marketData.bse.change > 0 ? '+' : ''}{marketData.bse.change.toFixed(2)})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}