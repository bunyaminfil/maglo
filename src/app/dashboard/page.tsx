"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { clearSession, getUser, isAuthenticated } from "@/lib/auth";
import { useDashboardData } from "@/lib/hooks";
import { formatCurrency, formatDate, formatRelativeDate } from "@/lib/formatting";
import { useLocale } from "@/lib/locale-context";
import { DashboardSkeleton } from "@/components/skeletons";
import {
  LoadingOverlay,
  ApiStatusIndicator,
  ErrorMessage,
  RetryButton,
  SuccessMessage
} from "@/components/api-status";
const WorkingCapitalChart = dynamic(() => import("@/components/charts").then(mod => ({ default: mod.WorkingCapitalChart })), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 rounded-lg animate-pulse"></div>
});
import { ErrorBoundary } from "@/components/error-boundary";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { locale } = useLocale();
  const { data, isLoading, isSuccess, hasError, errors, refetchAll, lastUpdated, status } = useDashboardData({
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

      {/* Mobile Overlay - Removed to keep layout visible */}

      {/* Left Sidebar */}
      <aside className={`
        w-[250px] flex flex-col bg-[#FAFAFA] shadow-[0_0_10px_rgba(0,0,0,0.05)] py-8 px-6 h-screen
        fixed lg:relative z-30 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-7 h-7 bg-[#1B212D] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-lg font-bold text-[#1B212D]">Maglo.</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-semibold rounded-md bg-[#C8EE44] text-[#1B212D] font-medium">
                <Image
                  src="/icons/dashboard.svg"
                  alt="Dashboard"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
                <Image
                  src="/icons/transactions.svg"
                  alt="Transactions"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                Transactions
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
                <Image
                  src="/icons/invoices.svg"
                  alt="Invoices"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                Invoices
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
                <Image
                  src="/icons/wallets.svg"
                  alt="Wallets"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                My Wallets
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
                <Image
                  src="/icons/settings.svg"
                  alt="Settings"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-auto pt-8">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
                <Image
                  src="/icons/help.svg"
                  alt="Help"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                Help
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md cursor-pointer">
                <Image
                  src="/icons/logout.svg"
                  alt="Logout"
                  width={20}
                  height={20}
                  className="text-[#1B212D]"
                />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen lg:ml-0">
        {/* Top Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-[250px] flex justify-end lg:justify-between items-center h-[80px] px-8 bg-white z-40">
          <h1 className="text-[25px] font-semibold text-[#1B212D] hidden lg:block">Dashboard</h1>
          <div className="flex items-center gap-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-[#666666]">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-[#666666]">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6945 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3055 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="relative w-9 h-9 rounded-full border-2 border-pink-500 overflow-hidden bg-gray-200">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user.fullName?.charAt(0) || "M"}
                </div>
              </div>
              <span className="font-semibold text-[#1B212D] text-[14px]">{user.fullName || "Mahfuzul Nabil"}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#666666]">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </header>

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Total Balance */}
                      <div className="flex items-center gap-3 bg-[#363A3F] text-white p-4 rounded-lg h-[105px]">
                        <Image
                          src="/icons/icon-balance.svg"
                          alt="Dashboard"
                          width={42}
                          height={42}
                        />
                        <div className="items-center gap-3">
                          <div className="text-sm text-[#929EAE] mb-2">Total balance</div>
                          <span className="text-2xl font-bold">
                            {data.financialSummary
                              ? formatCurrency((data.financialSummary as any).totalBalance.amount, { currency: (data.financialSummary as any).totalBalance.currency })
                              : '$0.00'
                            }
                          </span>
                        </div>
                      </div>

                      {/* Total Spending */}
                      <div className="flex items-center gap-3 bg-[#F8F8F8] p-4 rounded-lg shadow-sm h-[105px]">
                        <Image
                          src="/icons/icon-spending.svg"
                          alt="Dashboard"
                          width={42}
                          height={42}
                        />
                        <div className="items-center gap-3">
                          <div className="text-sm text-[#929EAE] mb-2">Total spending</div>
                          <span className="text-2xl font-bold text-[#1B212D]">
                            {data.financialSummary
                              ? formatCurrency((data.financialSummary as any).totalExpense.amount, { currency: (data.financialSummary as any).totalExpense.currency })
                              : '$0.00'
                            }
                          </span>
                        </div>
                      </div>

                      {/* Total Saved */}
                      <div className="flex items-center gap-3 bg-[#F8F8F8] p-4 rounded-lg shadow-sm h-[105px]">
                        <Image
                          src="/icons/icon-saved.svg"
                          alt="Dashboard"
                          width={42}
                          height={42}
                        />
                        <div className="items-center gap-3">
                          <div className="text-sm text-[#929EAE] mb-2">Total saved</div>
                          <span className="text-2xl font-bold text-[#1B212D]">
                            {data.financialSummary
                              ? formatCurrency((data.financialSummary as any).totalSavings.amount, { currency: (data.financialSummary as any).totalSavings.currency })
                              : '$0.00'
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Working Capital Graph */}
                    <WorkingCapitalChart
                      data={chartData}
                      isLoading={isLoading}
                      error={errors.workingCapital?.message || null}
                      currency={(data.workingCapital as any)?.currency || 'TRY'}
                    />

                    {/* Recent Transactions */}
                    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-4 lg:mb-6">
                        <h2 className="text-lg font-semibold text-[#1B212D]">Recent Transaction</h2>
                        <Link href="/dashboard" className="text-sm font-semibold text-[#29A073] hover:underline">View All &gt;</Link>
                      </div>

                      <div className="space-y-0">
                        {/* Transaction Headers - Hidden on mobile */}
                        <div className="hidden lg:grid grid-cols-4 gap-4 text-[12px] text-[#929EAE] font-semibold pb-2 border-b">
                          <div>NAME/BUSINESS</div>
                          <div>TYPE</div>
                          <div>AMOUNT</div>
                          <div>DATE</div>
                        </div>

                        {/* Transaction Rows */}
                        {(data.recentTransactions as any)?.transactions?.length > 0 ? (
                          (data.recentTransactions as any).transactions.map((transaction: any, index: number) => (
                            <div key={transaction.id}>
                              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4 items-center py-3 lg:py-3">
                                {/* Mobile Layout */}
                                <div className="lg:hidden">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center overflow-hidden">
                                      {transaction.image ? (
                                        <img
                                          src={transaction.image}
                                          alt={transaction.name}
                                          className="w-full h-full object-cover rounded"
                                        />
                                      ) : (
                                        <span className="text-gray-600 font-bold text-sm">
                                          {transaction.name.charAt(0).toUpperCase()}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-[#1B212D] text-sm">{transaction.name}</div>
                                      <div className="text-[12px] text-[#929EAE]">{transaction.business}</div>
                                    </div>
                                    <div className={`font-semibold text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-[#1B212D]'}`}>
                                      {transaction.amount > 0 ? '+' : ''}
                                      {formatCurrency(Math.abs(transaction.amount), { currency: transaction.currency as any })}
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center text-[12px] text-[#929EAE]">
                                    <span className="capitalize">{transaction.type}</span>
                                    <span>{formatRelativeDate(transaction.date, locale)}</span>
                                  </div>
                                </div>

                                {/* Desktop Layout */}
                                <div className="hidden lg:flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center overflow-hidden">
                                    {transaction.image ? (
                                      <img
                                        src={transaction.image}
                                        alt={transaction.name}
                                        className="w-full h-full object-cover rounded"
                                      />
                                    ) : (
                                      <span className="text-gray-600 font-bold text-sm">
                                        {transaction.name.charAt(0).toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-[#1B212D] text-sm">{transaction.name}</div>
                                    <div className="text-[12px] text-[#929EAE]">{transaction.business}</div>
                                  </div>
                                </div>
                                <div className="hidden lg:block text-sm text-[#929EAE] capitalize">{transaction.type}</div>
                                <div className={`hidden lg:block font-semibold text-[#1B212D] ${transaction.amount > 0 ? 'text-green-600' : 'text-[#1B212D]'}`}>
                                  {transaction.amount > 0 ? '+' : ''}
                                  {formatCurrency(Math.abs(transaction.amount), { currency: transaction.currency as any })}
                                </div>
                                <div className="hidden lg:block text-sm font-medium text-[#929EAE]">
                                  {formatRelativeDate(transaction.date, locale)}
                                </div>
                              </div>
                              {index < (data.recentTransactions as any).transactions.length - 1 && (
                                <div className="h-px bg-[#FAFAFA]"></div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">📊</div>
                            <p>No recent transactions</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Wallet & Transfers */}
                  <div className="col-span-1 lg:col-span-1">
                    {/* Combined Wallet & Transfers Section */}
                    <div className="bg-white rounded-lg">
                      {/* Wallet Header */}
                      <div className="flex justify-between items-center pb-4">
                        <h2 className="text-lg font-semibold text-[#1B212D]">Wallet</h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-[#1B212D]">
                          <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      {/* Credit Cards Stack */}
                      <div className="relative h-48">
                        {(data.wallets as any)?.cards?.length > 0 ? (
                          <>
                            {/* Primary Dark Card */}
                            <div
                              className="text-white p-6 shadow-lg relative"
                              style={{
                                width: '100%',
                                height: '210px',
                                background: `linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)`,
                                borderRadius: '15px',
                                opacity: 1,
                              }}
                            >
                              <div className="flex justify-between items-start mb-4 w-full">
                                <div className="w-full">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-white font-bold text-medium">Maglo.</span>
                                    <div className="w-px h-4 bg-white opacity-60"></div>
                                    <span className="text-[#626260] text-[12px]">{(data.wallets as any).cards[0]?.bank}</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-3 w-full">
                                    <Image
                                      src="/icons/group.svg"
                                      alt="group"
                                      width={38}
                                      height={30}
                                    />
                                    <Image
                                      src="/icons/wifi.svg"
                                      alt="wifi"
                                      width={33}
                                      height={34}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="text-center mt-2">
                                <div className="flex text-xl font-mono font-bold tracking-wider">
                                  {(data.wallets as any).cards[0]?.cardNumber || '5495 7381 3759 2321'}
                                </div>
                                <div className="flex justify-between items-center mt-3 w-full">
                                  <div className="text-xs text-[#929EAE] mt-1">
                                    {(data.wallets as any).cards[0]?.expiryMonth || 12}/{(data.wallets as any).cards[0]?.expiryYear || 2027}
                                  </div>
                                  <Image
                                    src="/icons/international.svg"
                                    alt="wifi"
                                    width={47}
                                    height={36}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Secondary Card */}
                            {(data.wallets as any).cards.length > 1 && (
                              <div
                                className="absolute p-4 shadow-lg"
                                style={{
                                  width: '94%',
                                  height: '172px',
                                  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)`,
                                  borderRadius: '15px',
                                  // opacity: 0.5,
                                  top: '140px',
                                  left: '3%',
                                  border: '0.5px solid',
                                  borderImageSource: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.4) -41.08%, rgba(255, 255, 255, 0.1) 104.09%)',
                                  backdropFilter: 'blur(10px)',
                                }}
                              >
                                <div className="flex justify-between items-start mb-4 w-full">
                                  <div className="w-full">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-white font-bold text-medium">Maglo.</span>
                                      <div className="w-px h-4 bg-white opacity-60"></div>
                                      <span className="text-[#F5F5F5] text-[12px]">{(data.wallets as any).cards[1]?.bank}</span>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                      <Image
                                        src="/icons/group.svg"
                                        alt="group"
                                        width={30}
                                        height={24}
                                      />
                                      <Image
                                        src="/icons/wifi.svg"
                                        alt="wifi"
                                        width={33}
                                        height={34}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center mt-2">
                                  <div className="flex text-medium font-mono font-bold tracking-wider">
                                    {(data.wallets as any).cards[1]?.cardNumber?.replace(/\s/g, '')}
                                  </div>
                                  <div className="flex justify-between items-center mt-3 w-full">
                                    <div className="text-xs text-[#929EAE] mt-1">
                                      {(data.wallets as any).cards[1]?.expiryMonth || 9}/{(data.wallets as any).cards[1]?.expiryYear || 2025}
                                    </div>
                                    <Image
                                      src="/icons/visa.svg"
                                      alt="visa"
                                      width={33}
                                      height={34}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="h-40 flex items-center justify-center bg-gray-50 rounded-xl">
                            <div className="text-center">
                              <div className="text-4xl mb-2">💳</div>
                              <p className="text-sm text-gray-500">No wallets available</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Scheduled Transfers */}
                      <div className="px-6 mt-36 pb-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-lg font-semibold text-[#1B212D]">Scheduled Transfers</h2>
                          <Link href="/dashboard" className="text-sm font-semibold text-[#29A073] hover:underline">View All &gt;</Link>
                        </div>

                        <div className="space-y-0">
                          {(data.scheduledTransfers as any)?.transfers?.length > 0 ? (
                            (data.scheduledTransfers as any).transfers.slice(0, 5).map((transfer: any, index: number) => (
                              <div key={transfer.id}>
                                <div className="flex items-center gap-3 py-4">
                                  <div className="w-[33px] h-[33px] bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {transfer.image ? (
                                      <img
                                        src={transfer.image}
                                        alt={transfer.name}
                                        className="w-full h-full object-cover rounded-full"
                                      />
                                    ) : (
                                      <span className="text-blue-600 font-semibold text-sm">
                                        {transfer.name.charAt(0).toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-sm text-[#1B212D]">{transfer.name}</div>
                                    <div className="text-[12px] font-medium text-[#929EAE]">
                                      {formatDate(transfer.date, locale, {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </div>
                                  </div>
                                  <div className="font-semibold text-[#000000]">
                                    {transfer.amount > 0 ? '+' : '- '}
                                    {formatCurrency(Math.abs(transfer.amount), { currency: transfer.currency as any })}
                                  </div>
                                </div>
                                {index < (data.scheduledTransfers as any).transfers.slice(0, 5).length - 1 && (
                                  <div className="h-px bg-[#FAFAFA]"></div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <div className="text-4xl mb-2">📅</div>
                              <p className="text-sm">No scheduled transfers</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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


