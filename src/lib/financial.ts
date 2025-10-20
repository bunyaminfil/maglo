"use client";

export type FinancialSummary = {
  totalBalance: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: "up" | "down";
    };
  };
  totalExpense: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: "up" | "down";
    };
  };
  totalSavings: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: "up" | "down";
    };
  };
  lastUpdated: string;
};

export type WorkingCapital = {
  currentAssets: number;
  currentLiabilities: number;
  workingCapital: number;
  quickRatio: number;
  currentRatio: number;
  currency: string;
};

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  currency: string;
  type: "checking" | "savings" | "investment" | "credit";
  isActive: boolean;
};

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  type: "income" | "expense" | "transfer";
  category: string;
  description: string;
  date: string;
  walletId: string;
};

export type ScheduledTransfer = {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  currency: string;
  scheduledDate: string;
  frequency: "once" | "weekly" | "monthly" | "yearly";
  isActive: boolean;
  description: string;
};

import { getApiEndpoint } from './api-config';

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await res.json() : (await res.text());
  
  if (!res.ok) {
    const payload: any = typeof data === "string" ? { message: data } : (data || {});
    const err = new Error(payload?.message || "İstek başarısız");
    (err as any).code = payload?.code;
    (err as any).details = payload?.details;
    throw err;
  }
  
  // Normalize common API envelope shapes
  if (isJson && data && typeof data === "object") {
    const payload: any = data;
    if (Object.prototype.hasOwnProperty.call(payload, "success")) {
      if (payload.success === false) {
        const err = new Error(payload?.message || "İstek başarısız");
        (err as any).code = payload?.code;
        (err as any).details = payload?.details;
        throw err;
      }
      if (payload.success === true && Object.prototype.hasOwnProperty.call(payload, "data")) {
        return payload.data as T;
      }
    }
  }
  
  return data as T;
}

export async function getFinancialSummary(): Promise<FinancialSummary> {
  const res = await fetch(getApiEndpoint('/financial/summary'), {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem("maglo_token") : ""}`
    },
  });
  return handleResponse<FinancialSummary>(res);
}

export async function getWorkingCapital(): Promise<WorkingCapital> {
  const res = await fetch(getApiEndpoint('/financial/working-capital'), {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem("maglo_token") : ""}`
    },
  });
  return handleResponse<WorkingCapital>(res);
}

export async function getWallet(): Promise<Wallet[]> {
  const res = await fetch(getApiEndpoint('/financial/wallet'), {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem("maglo_token") : ""}`
    },
  });
  return handleResponse<Wallet[]>(res);
}

export async function getRecentTransactions(limit: number = 3): Promise<Transaction[]> {
  const res = await fetch(getApiEndpoint(`/financial/transactions/recent?limit=${limit}`), {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem("maglo_token") : ""}`
    },
  });
  return handleResponse<Transaction[]>(res);
}

export async function getScheduledTransfers(): Promise<ScheduledTransfer[]> {
  const res = await fetch(getApiEndpoint('/financial/transfers/scheduled'), {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem("maglo_token") : ""}`
    },
  });
  return handleResponse<ScheduledTransfer[]>(res);
}
