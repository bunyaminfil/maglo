"use client";

import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 rounded',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
}

export function SummaryCardSkeleton() {
  return (
    <div className="bg-[#1A1A1A] text-white p-6 rounded-lg">
      <Skeleton className="h-4 w-24 mb-2 bg-gray-400" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 bg-gray-400" />
        <Skeleton className="h-8 w-32 bg-gray-400" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}

export function TransactionSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      {/* Headers */}
      <div className="grid grid-cols-4 gap-4 text-sm text-gray-500 font-medium pb-2 border-b">
        <div>NAME/BUSINESS</div>
        <div>TYPE</div>
        <div>AMOUNT</div>
        <div>DATE</div>
      </div>
      
      {/* Skeleton rows */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 items-center py-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

export function WalletSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-5 w-5" />
      </div>
      
      <div className="relative h-48">
        {/* Primary Card Skeleton */}
        <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] text-white p-6 rounded-xl shadow-lg relative z-10 h-40">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-16 bg-gray-400" />
                <Skeleton className="h-4 w-px bg-gray-400" />
                <Skeleton className="h-4 w-24 bg-gray-400" />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Skeleton className="w-8 h-6 bg-gray-400 rounded-sm" />
                <Skeleton className="w-5 h-5 bg-gray-400" />
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <Skeleton className="h-6 w-48 mx-auto bg-gray-400" />
          </div>
        </div>
        
        {/* Secondary Card Skeleton */}
        <div className="absolute top-32 left-6 right-6 bg-white/90 backdrop-blur-sm border border-white/30 p-4 rounded-xl shadow-lg z-20 h-36">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-3 w-px" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="w-6 h-4 rounded-sm" />
                <Skeleton className="w-4 h-4" />
              </div>
            </div>
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScheduledTransfersSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="col-span-2 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6">
          <SummaryCardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        
        {/* Chart */}
        <ChartSkeleton />
        
        {/* Transactions */}
        <TransactionSkeleton />
      </div>
      
      {/* Right Column */}
      <div className="col-span-1 space-y-8">
        <WalletSkeleton />
        <ScheduledTransfersSkeleton />
      </div>
    </div>
  );
}
