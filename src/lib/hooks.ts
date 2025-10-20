"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getFinancialSummary,
  getWorkingCapital,
  getWallet,
  getRecentTransactions,
  getScheduledTransfers,
  FinancialSummary,
  WorkingCapital,
  Wallet,
  Transaction,
  ScheduledTransfer,
} from './financial';

// API Status Types
export interface ApiStatus {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: any;
  lastUpdated?: Date;
}

export interface ApiCallOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  retryCount?: number;
  retryDelay?: number;
}

// Enhanced Financial Summary Hook with comprehensive status management
export function useFinancialSummary(options: ApiCallOptions = {}) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Financial summary loaded successfully',
    errorMessage = 'Failed to load financial summary',
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const [lastUpdated, setLastUpdated] = useState<Date | undefined>();

  const query = useQuery<FinancialSummary, Error>({
    queryKey: ['financial-summary'],
    queryFn: getFinancialSummary,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: retryCount,
    retryDelay: retryDelay,
  });

  // Handle success
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setLastUpdated(new Date());
      if (showSuccessToast) {
        toast.success(successMessage);
      }
    }
  }, [query.isSuccess, query.data, showSuccessToast, successMessage]);

  // Handle error
  useEffect(() => {
    if (query.error && showErrorToast) {
      toast.error(`${errorMessage}: ${query.error.message}`);
    }
  }, [query.error, showErrorToast, errorMessage]);

  return {
    ...query,
    lastUpdated,
    status: {
      isLoading: query.isLoading,
      isSuccess: query.isSuccess,
      isError: query.isError,
      error: query.error,
      data: query.data,
      lastUpdated
    }
  };
}

// Enhanced Working Capital Hook
export function useWorkingCapital(options: ApiCallOptions = {}) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Working capital data loaded successfully',
    errorMessage = 'Failed to load working capital data',
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const [lastUpdated, setLastUpdated] = useState<Date | undefined>();

  const query = useQuery<WorkingCapital, Error>({
    queryKey: ['working-capital'],
    queryFn: getWorkingCapital,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: retryCount,
    retryDelay: retryDelay,
  });

  // Handle success
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setLastUpdated(new Date());
      if (showSuccessToast) {
        toast.success(successMessage);
      }
    }
  }, [query.isSuccess, query.data, showSuccessToast, successMessage]);

  // Handle error
  useEffect(() => {
    if (query.error && showErrorToast) {
      toast.error(`${errorMessage}: ${query.error.message}`);
    }
  }, [query.error, showErrorToast, errorMessage]);

  return {
    ...query,
    lastUpdated,
    status: {
      isLoading: query.isLoading,
      isSuccess: query.isSuccess,
      isError: query.isError,
      error: query.error,
      data: query.data,
      lastUpdated
    }
  };
}

// Enhanced Wallets Hook
export function useWallets(options: ApiCallOptions = {}) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Wallets loaded successfully',
    errorMessage = 'Failed to load wallets',
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const [lastUpdated, setLastUpdated] = useState<Date | undefined>();

  const query = useQuery<Wallet[], Error>({
    queryKey: ['wallets'],
    queryFn: getWallet,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: retryCount,
    retryDelay: retryDelay,
  });

  // Handle success
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setLastUpdated(new Date());
      if (showSuccessToast) {
        toast.success(successMessage);
      }
    }
  }, [query.isSuccess, query.data, showSuccessToast, successMessage]);

  // Handle error
  useEffect(() => {
    if (query.error && showErrorToast) {
      toast.error(`${errorMessage}: ${query.error.message}`);
    }
  }, [query.error, showErrorToast, errorMessage]);

  return {
    ...query,
    lastUpdated,
    status: {
      isLoading: query.isLoading,
      isSuccess: query.isSuccess,
      isError: query.isError,
      error: query.error,
      data: query.data,
      lastUpdated
    }
  };
}

// Enhanced Recent Transactions Hook
export function useRecentTransactions(limit: number = 3, options: ApiCallOptions = {}) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Recent transactions loaded successfully',
    errorMessage = 'Failed to load recent transactions',
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const [lastUpdated, setLastUpdated] = useState<Date | undefined>();

  const query = useQuery<any, Error>({
    queryKey: ['recent-transactions', limit],
    queryFn: () => getRecentTransactions(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: retryCount,
    retryDelay: retryDelay,
  });

  // Handle success
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setLastUpdated(new Date());
      if (showSuccessToast) {
        toast.success(successMessage);
      }
    }
  }, [query.isSuccess, query.data, showSuccessToast, successMessage]);

  // Handle error
  useEffect(() => {
    if (query.error && showErrorToast) {
      toast.error(`${errorMessage}: ${query.error.message}`);
    }
  }, [query.error, showErrorToast, errorMessage]);

  return {
    ...query,
    lastUpdated,
    status: {
      isLoading: query.isLoading,
      isSuccess: query.isSuccess,
      isError: query.isError,
      error: query.error,
      data: query.data,
      lastUpdated
    }
  };
}

// Enhanced Scheduled Transfers Hook
export function useScheduledTransfers(options: ApiCallOptions = {}) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Scheduled transfers loaded successfully',
    errorMessage = 'Failed to load scheduled transfers',
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const [lastUpdated, setLastUpdated] = useState<Date | undefined>();

  const query = useQuery<ScheduledTransfer[], Error>({
    queryKey: ['scheduled-transfers'],
    queryFn: getScheduledTransfers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: retryCount,
    retryDelay: retryDelay,
  });

  // Handle success
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setLastUpdated(new Date());
      if (showSuccessToast) {
        toast.success(successMessage);
      }
    }
  }, [query.isSuccess, query.data, showSuccessToast, successMessage]);

  // Handle error
  useEffect(() => {
    if (query.error && showErrorToast) {
      toast.error(`${errorMessage}: ${query.error.message}`);
    }
  }, [query.error, showErrorToast, errorMessage]);

  return {
    ...query,
    lastUpdated,
    status: {
      isLoading: query.isLoading,
      isSuccess: query.isSuccess,
      isError: query.isError,
      error: query.error,
      data: query.data,
      lastUpdated
    }
  };
}

// Enhanced Combined Dashboard Data Hook
export function useDashboardData(options: ApiCallOptions = {}) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Dashboard data loaded successfully',
    errorMessage = 'Failed to load dashboard data'
  } = options;

  const financialSummary = useFinancialSummary({ ...options, showSuccessToast: false });
  const workingCapital = useWorkingCapital({ ...options, showSuccessToast: false });
  const wallets = useWallets({ ...options, showSuccessToast: false });
  const recentTransactions = useRecentTransactions(3, { ...options, showSuccessToast: false });
  const scheduledTransfers = useScheduledTransfers({ ...options, showSuccessToast: false });

  const isLoading = 
    financialSummary.isLoading ||
    workingCapital.isLoading ||
    wallets.isLoading ||
    recentTransactions.isLoading ||
    scheduledTransfers.isLoading;

  const isSuccess = 
    financialSummary.isSuccess &&
    workingCapital.isSuccess &&
    wallets.isSuccess &&
    recentTransactions.isSuccess &&
    scheduledTransfers.isSuccess;

  const hasError = 
    financialSummary.isError ||
    workingCapital.isError ||
    wallets.isError ||
    recentTransactions.isError ||
    scheduledTransfers.isError;

  const errors = {
    financialSummary: financialSummary.error,
    workingCapital: workingCapital.error,
    wallets: wallets.error,
    recentTransactions: recentTransactions.error,
    scheduledTransfers: scheduledTransfers.error,
  };

  const refetchAll = () => {
    financialSummary.refetch();
    workingCapital.refetch();
    wallets.refetch();
    recentTransactions.refetch();
    scheduledTransfers.refetch();
  };

  // Show success toast when all data is loaded
  useEffect(() => {
    if (isSuccess && showSuccessToast && !isLoading) {
      toast.success(successMessage);
    }
  }, [isSuccess, showSuccessToast, isLoading, successMessage]);

  // Show error toast when any error occurs
  useEffect(() => {
    if (hasError && showErrorToast) {
      const errorMessages = Object.values(errors)
        .filter(error => error)
        .map(error => error?.message)
        .join(', ');
      
      if (errorMessages) {
        toast.error(`${errorMessage}: ${errorMessages}`);
      }
    }
  }, [hasError, showErrorToast, errorMessage, errors]);

  return {
    data: {
      financialSummary: financialSummary.data || null,
      workingCapital: workingCapital.data || null,
      wallets: (wallets.data as Wallet[]) || [],
      recentTransactions: recentTransactions.data || null,
      scheduledTransfers: (scheduledTransfers.data as ScheduledTransfer[]) || [],
    },
    isLoading,
    isSuccess,
    hasError,
    errors,
    refetchAll,
    refetchSummary: financialSummary.refetch,
    refetchWorkingCapital: workingCapital.refetch,
    refetchWallets: wallets.refetch,
    refetchTransactions: recentTransactions.refetch,
    refetchTransfers: scheduledTransfers.refetch,
    lastUpdated: {
      financialSummary: financialSummary.lastUpdated,
      workingCapital: workingCapital.lastUpdated,
      wallets: wallets.lastUpdated,
      recentTransactions: recentTransactions.lastUpdated,
      scheduledTransfers: scheduledTransfers.lastUpdated,
    },
    status: {
      isLoading,
      isSuccess,
      isError: hasError,
      error: Object.values(errors).find(error => error) || null,
      data: {
        financialSummary: financialSummary.data || null,
        workingCapital: workingCapital.data || null,
        wallets: (wallets.data as Wallet[]) || [],
        recentTransactions: recentTransactions.data || null,
        scheduledTransfers: (scheduledTransfers.data as ScheduledTransfer[]) || [],
      }
    }
  };
}

// Generic API Status Hook for custom API calls
export function useApiStatus<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options: ApiCallOptions & { staleTime?: number } = {}
) {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Data loaded successfully',
    errorMessage = 'Failed to load data',
    retryCount = 3,
    retryDelay = 1000,
    staleTime = 5 * 60 * 1000
  } = options;

  const [lastUpdated, setLastUpdated] = useState<Date | undefined>();

  const query = useQuery<T, Error>({
    queryKey,
    queryFn,
    staleTime,
    retry: retryCount,
    retryDelay: retryDelay,
  });

  // Handle success
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setLastUpdated(new Date());
      if (showSuccessToast) {
        toast.success(successMessage);
      }
    }
  }, [query.isSuccess, query.data, showSuccessToast, successMessage]);

  // Handle error
  useEffect(() => {
    if (query.error && showErrorToast) {
      toast.error(`${errorMessage}: ${query.error.message}`);
    }
  }, [query.error, showErrorToast, errorMessage]);

  return {
    ...query,
    lastUpdated,
    status: {
      isLoading: query.isLoading,
      isSuccess: query.isSuccess,
      isError: query.isError,
      error: query.error,
      data: query.data,
      lastUpdated
    }
  };
}

// Mutation Hook for API operations that modify data
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    successMessage?: string;
    errorMessage?: string;
    invalidateQueries?: string[][];
  } = {}
) {
  const queryClient = useQueryClient();
  const {
    onSuccess,
    onError,
    successMessage = 'Operation completed successfully',
    errorMessage = 'Operation failed',
    invalidateQueries = []
  } = options;

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      toast.success(successMessage);
      
      // Invalidate related queries
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
      
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      toast.error(`${errorMessage}: ${error.message}`);
      
      if (onError) {
        onError(error, variables);
      }
    }
  });
}