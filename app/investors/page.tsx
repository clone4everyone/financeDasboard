'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/ThemeProvider';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { Search, Filter, ArrowUpDown, Mail, TrendingUp, TrendingDown } from 'lucide-react';

interface Investor {
  id: number;
  name: string;
  email: string;
  scheme: string;
  investment: number;
  returns: number;
  status: string;
}

interface InvestorsData {
  investors: Investor[];
  total: number;
  scheme: string;
}

function InvestorsContent() {
  const [data, setData] = useState<InvestorsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Null-safe usage to satisfy strict builds (e.g., Vercel)
  const searchParams = useSearchParams();
  const schemeFilter = searchParams?.get('scheme') ?? '';

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const url = schemeFilter
          ? `/api/investors?scheme=${encodeURIComponent(schemeFilter)}`
          : '/api/investors';

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch investors: ${res.status}`);
        const json = (await res.json()) as InvestorsData;
        setData(json);
      } catch (err) {
        console.error(err);
        setData({ investors: [], total: 0, scheme: schemeFilter });
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, [schemeFilter]);

  const filteredInvestors =
    data?.investors?.filter((investor) => {
      const q = searchTerm.toLowerCase();
      return (
        investor.name.toLowerCase().includes(q) ||
        investor.email.toLowerCase().includes(q) ||
        investor.scheme.toLowerCase().includes(q)
      );
    }) ?? [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Investors</h1>
          <p className="text-muted-foreground">
            {(data?.total ?? 0)} investors {schemeFilter && `for ${schemeFilter}`}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search investors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Badge */}
      {schemeFilter && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtered by:</span>
          <Badge variant="secondary" className="gap-2">
            {schemeFilter}
            <button
              onClick={() => (window.location.href = '/investors')}
              className="ml-1 hover:bg-muted-foreground/20 rounded-sm p-0.5"
              aria-label="Clear filter"
              title="Clear filter"
            >
              ×
            </button>
          </Badge>
        </div>
      )}

      {/* Investors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestors.map((investor) => (
          <Card key={investor.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{investor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{investor.scheme}</p>
                </div>
                <Badge
                  variant={investor.status === 'Active' ? 'default' : 'secondary'}
                  className={
                    investor.status === 'Active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : investor.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : ''
                  }
                >
                  {investor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{investor.email}</span>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-3 pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Investment</span>
                  <span className="font-semibold">₹{investor.investment.toLocaleString()}</span>
                </div>
                <div
                  className={`flex justify-between items-center ${
                    investor.returns >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <span className="text-sm text-muted-foreground">Returns</span>
                  <div className="flex items-center gap-1 font-semibold">
                    {investor.returns >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {investor.returns}%
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInvestors.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {searchTerm ? 'No investors found matching your search.' : 'No investors found.'}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InvestorsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DashboardProvider>
        <Layout>
          <Suspense
            fallback={
              <div className="space-y-6">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-48 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-48 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            }
          >
            <InvestorsContent />
          </Suspense>
        </Layout>
      </DashboardProvider>
    </ThemeProvider>
  );
}
