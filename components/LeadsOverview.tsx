"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart } from '@/components/charts/PieChart';
import { LineChart } from '@/components/charts/LineChart';

export function LeadsOverview() {
  const channelsPieData = {
    labels: ['Emails', 'Social Media', 'WhatsApp'],
    datasets: [
      {
        data: [70, 18, 12],
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Green
          '#F59E0B', // Amber
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#D97706',
        ],
        borderWidth: 2,
      },
    ],
  };

  const prospectComparisonData = {
    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
      {
        label: 'Prospects',
        data: [1000, 2000, 3000, 2500, 4000, 6000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const metrics = [
    { title: 'Total Investors', value: 3000 },
    { title: 'Active', value: 1237 },
    { title: 'Dormant', value: 1763 },
  ];

  const sipMetrics = [
    { type: 'SIP', value: 267, status: 'DUE', subtext: 'in next 7 days', expired: 30, expiredText: 'EXPIRED' },
    { type: 'CANCELLED', value: 324, status: 'LUMPSUM', subtext: 'in last 15 days', cancelled: 20, cancelledText: 'CEASED' },
  ];

  const rolloverMetrics = [
    { value: 12, status: 'FUNDS ROLLED OVER', subtext: 'in last 7 days' },
    { value: 8, status: 'FUNDS ROLLING OVER', subtext: 'in last 15 days' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Leads Overview</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Channels
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Investment Type
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Channels Chart */}
            <div>
              <h4 className="text-sm font-medium mb-4">Channels</h4>
              <div className="h-48">
                <PieChart data={channelsPieData} />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold">{metric.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{metric.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Prospect Comparison Chart */}
            <div>
              <h4 className="text-sm font-medium mb-4">Prospect Comparison</h4>
              <div className="h-48">
                <LineChart data={prospectComparisonData} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - SIP and Rollover Metrics */}
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sipMetrics.map((item, index) => (
              <div key={index} className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-muted-foreground">{item.type}</span>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-sm font-bold">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.status}</div>
                      <div className="text-xs text-muted-foreground/70">{item.subtext}</div>
                    </div>
                    {item.expired && (
                      <div className="text-center">
                        <div className="text-sm font-bold">{item.expired}</div>
                        <div className="text-xs text-muted-foreground">{item.expiredText}</div>
                        <div className="text-xs text-muted-foreground/70">in last 15 days</div>
                      </div>
                    )}
                    {item.cancelled && (
                      <div className="text-center">
                        <div className="text-sm font-bold">{item.cancelled}</div>
                        <div className="text-xs text-muted-foreground">{item.cancelledText}</div>
                        <div className="text-xs text-muted-foreground/70">in last 15 days</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rolloverMetrics.map((item, index) => (
              <div key={index} className="bg-muted/30 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">{item.value}</div>
                  <div className="text-sm font-medium">{item.status}</div>
                  <div className="text-xs text-muted-foreground">{item.subtext}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}