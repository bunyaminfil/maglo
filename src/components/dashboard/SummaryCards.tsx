"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/formatting";

interface SummaryCardsProps {
  financialSummary: {
    totalBalance: { amount: number; currency: string };
    totalExpense: { amount: number; currency: string };
    totalSavings: { amount: number; currency: string };
  } | null;
}

export function SummaryCards({ financialSummary }: SummaryCardsProps) {
  return (
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
            {financialSummary
              ? formatCurrency(financialSummary.totalBalance.amount, { currency: financialSummary.totalBalance.currency })
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
            {financialSummary
              ? formatCurrency(financialSummary.totalExpense.amount, { currency: financialSummary.totalExpense.currency })
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
            {financialSummary
              ? formatCurrency(financialSummary.totalSavings.amount, { currency: financialSummary.totalSavings.currency })
              : '$0.00'
            }
          </span>
        </div>
      </div>
    </div>
  );
}

