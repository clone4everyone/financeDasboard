"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart } from '@/components/charts/PieChart';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/contexts/DashboardContext';

export function AssetsUnderManagement() {
  const router = useRouter();
  const { dispatch } = useDashboard();

  const pieData = {
    labels: ['Cash', 'Equity', 'Debt'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Green  
          '#1E40AF', // Dark blue
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#1D4ED8',
        ],
        borderWidth: 2,
      },
    ],
  };

  const schemes = [
    { name: 'HDFC Equity Fund', nav: 1.2, percentage: 2.1, isPositive: true },
    { name: 'HDFC Advantage Fund', nav: 2.1, percentage: 1.7, isPositive: true },
    { name: 'HDFC Balanced Fund', nav: 1.7, percentage: -0.8, isPositive: false },
    { name: 'HDFC Capital Builder Fund', nav: 1.0, percentage: 1.2, isPositive: true },
    { name: 'HDFC Core Satellite Fund', nav: 2.6, percentage: 3.1, isPositive: true },
  ];

  const handleSchemeClick = (schemeName: string) => {
    dispatch({ type: 'SET_SELECTED_SCHEME', scheme: schemeName });
    router.push(`/investors?scheme=${encodeURIComponent(schemeName)}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Assets Under Management</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          Today
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="space-y-4">
            <div className="h-48 w-full">
              <PieChart data={pieData} />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-muted-foreground">Equity</div>
              <div className="text-2xl font-bold">5.5 <span className="text-sm font-normal">Crore</span></div>
              <div className="text-sm text-muted-foreground">5.5% of Schemes</div>
            </div>
          </div>

          {/* Schemes List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
              <span>Scheme</span>
              <span>NAV</span>
            </div>
            {schemes.map((scheme, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => handleSchemeClick(scheme.name)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm group-hover:text-primary transition-colors">
                    {scheme.name}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold">{scheme.nav}%</div>
                    <div className={`text-xs flex items-center gap-1 ${
                      scheme.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {scheme.isPositive ? 
                        <TrendingUp className="h-3 w-3" /> : 
                        <TrendingDown className="h-3 w-3" />
                      }
                      {Math.abs(scheme.percentage)}%
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">HDFC Mid Cap</div>
            <div className="text-sm text-blue-700 dark:text-blue-300 leading-tight">
              98% of your investors can benefit from HDFC Mid cap.
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">HDFC Equity Fund</div>
            <div className="text-sm text-green-700 dark:text-green-300 leading-tight">
              60% of your investors have not invested in HDFC Equity Fund
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
            <div className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">Capital Builder</div>
            <div className="text-sm text-orange-700 dark:text-orange-300 leading-tight">
              20% of your investors can benefit from HDFC Capital Builder Plan.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}