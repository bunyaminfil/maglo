"use client";

import { createContext, useContext, ReactNode } from 'react';
import { FinancialSummary, WorkingCapital, Wallet, Transaction, ScheduledTransfer } from './financial';

export interface FinancialContextType {
  // State
  financialSummary: FinancialSummary | null;
  workingCapital: WorkingCapital | null;
  wallets: Wallet[];
  recentTransactions: Transaction[];
  scheduledTransfers: ScheduledTransfer[];
  
  // Loading states
  isLoadingSummary: boolean;
  isLoadingWorkingCapital: boolean;
  isLoadingWallets: boolean;
  isLoadingTransactions: boolean;
  isLoadingTransfers: boolean;
  
  // Error states
  summaryError: string | null;
  workingCapitalError: string | null;
  walletsError: string | null;
  transactionsError: string | null;
  transfersError: string | null;
  
  // Actions
  refetchAll: () => void;
  refetchSummary: () => void;
  refetchWorkingCapital: () => void;
  refetchWallets: () => void;
  refetchTransactions: () => void;
  refetchTransfers: () => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: ReactNode }) {
  // Bu context'i React Query hooks ile dolduracağız
  const value: FinancialContextType = {
    financialSummary: null,
    workingCapital: null,
    wallets: [],
    recentTransactions: [],
    scheduledTransfers: [],
    isLoadingSummary: false,
    isLoadingWorkingCapital: false,
    isLoadingWallets: false,
    isLoadingTransactions: false,
    isLoadingTransfers: false,
    summaryError: null,
    workingCapitalError: null,
    walletsError: null,
    transactionsError: null,
    transfersError: null,
    refetchAll: () => {},
    refetchSummary: () => {},
    refetchWorkingCapital: () => {},
    refetchWallets: () => {},
    refetchTransactions: () => {},
    refetchTransfers: () => {},
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}
