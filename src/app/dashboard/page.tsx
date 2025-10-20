"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { clearSession, getUser, isAuthenticated } from "@/lib/auth";
import { useDashboardData } from "@/lib/hooks";
import { useLocale } from "@/lib/locale-context";
import { DashboardSkeleton } from "@/components/skeletons";
import {
  LoadingOverlay,
  ErrorMessage,
  RetryButton,
} from "@/components/api-status";
const WorkingCapitalChart = dynamic(() => import("@/components/charts").then(mod => ({ default: mod.WorkingCapitalChart })), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 rounded-lg animate-pulse"></div>
});
import { ErrorBoundary } from "@/components/error-boundary";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { WalletSection } from "@/components/dashboard/WalletSection";
import { ScheduledTransfers } from "@/components/dashboard/ScheduledTransfers";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { locale } = useLocale();
  const { data, isLoading, hasError, errors, refetchAll } = useDashboardData({
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to load dashboard data'
  });

  useEffect(() => {
    setIsClient(true);
    const currentUser = getUser();
    setUser(currentUser);

    if (!isAuthenticated()) {
      router.replace("/auth");
    }
  }, [router]);

  function handleLogout() {
    clearSession();
    router.replace("/auth");
  }

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return <DashboardSkeleton />;
  }

  // Transform working capital data for chart
  const chartData = (data.workingCapital as any)?.data?.map((item: any, index: number) => ({
    date: item.month || `Month ${index + 1}`,
    income: Number(item.income) || 0,
    expenses: Number(item.expense) || 0,
    net: Number(item.net) || 0
  })) || [];

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen lg:ml-0">
        {/* Header */}
        <DashboardHeader user={user} />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-8 bg-white overflow-y-auto pt-[120px] lg:pt-[100px]">
          <ErrorBoundary>
            {/* API Status Indicator */}
            <div className="mb-4 flex justify-between items-center">
              {hasError && (
                <RetryButton
                  onRetry={refetchAll}
                  isLoading={isLoading}
                  className="text-sm px-3 py-1"
                />
              )}
            </div>

            {/* Error Messages */}
            {hasError && (
              <div className="mb-4 space-y-2">
                {errors.financialSummary && (
                  <ErrorMessage
                    message={`Financial Summary: ${errors.financialSummary.message}`}
                    onRetry={() => refetchAll()}
                  />
                )}
                {errors.workingCapital && (
                  <ErrorMessage
                    message={`Working Capital: ${errors.workingCapital.message}`}
                    onRetry={() => refetchAll()}
                  />
                )}
                {errors.wallets && (
                  <ErrorMessage
                    message={`Wallets: ${errors.wallets.message}`}
                    onRetry={() => refetchAll()}
                  />
                )}
                {errors.recentTransactions && (
                  <ErrorMessage
                    message={`Recent Transactions: ${errors.recentTransactions.message}`}
                    onRetry={() => refetchAll()}
                  />
                )}
                {errors.scheduledTransfers && (
                  <ErrorMessage
                    message={`Scheduled Transfers: ${errors.scheduledTransfers.message}`}
                    onRetry={() => refetchAll()}
                  />
                )}
              </div>
            )}

            <LoadingOverlay isLoading={isLoading} message="Loading dashboard data...">
              {isLoading ? (
                <DashboardSkeleton />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                  {/* Left Column - Main Content */}
                  <div className="col-span-1 lg:col-span-2 space-y-4 lg:space-y-8">
                    {/* Summary Cards */}
                    <SummaryCards financialSummary={data.financialSummary as any} />

                    {/* Working Capital Graph */}
                    <WorkingCapitalChart
                      data={chartData}
                      isLoading={isLoading}
                      error={errors.workingCapital?.message || null}
                      currency={(data.workingCapital as any)?.currency || 'TRY'}
                    />

                    {/* Recent Transactions */}
                    <RecentTransactions 
                      transactions={(data.recentTransactions as any)?.transactions || []} 
                      locale={locale}
                    />
                  </div>

                  {/* Right Column - Wallet & Transfers */}
                  <div className="col-span-1 lg:col-span-1">
                    <WalletSection cards={(data.wallets as any)?.cards || []} />
                    <ScheduledTransfers 
                      transfers={(data.scheduledTransfers as any)?.transfers || []} 
                      locale={locale}
                    />
                  </div>
                </div>
              )}
            </LoadingOverlay>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
