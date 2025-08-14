"use client";

import { TransactionSnapshot } from '@/components/TransactionSnapshot';
import { TodoSection } from '@/components/TodoSection';
import { AssetsUnderManagement } from '@/components/AssetsUnderManagement';
import { MarketOverview } from '@/components/MarketOverview';
import { LeadsOverview } from '@/components/LeadsOverview';
import { Layout } from '@/components/Layout';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DashboardProvider>
        <Layout>
          <div className="space-y-6">
            {/* Top Row - Transaction Snapshot and To-Do's */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <TransactionSnapshot />
              </div>
              <div>
                <TodoSection />
              </div>
            </div>

            {/* Second Row - Assets Under Management */}
            <AssetsUnderManagement />

            {/* Third Row - Market Overview */}
            <MarketOverview />

            {/* Fourth Row - Leads Overview */}
            <LeadsOverview />
          </div>
        </Layout>
        <Toaster />
      </DashboardProvider>
    </ThemeProvider>
  );
}