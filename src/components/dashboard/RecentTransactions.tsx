"use client";

import Link from "next/link";
import { formatCurrency, formatRelativeDate, SupportedLocale } from "@/lib/formatting";

interface Transaction {
  id: string;
  name: string;
  business: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  image?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  locale: SupportedLocale;
}

export function RecentTransactions({ transactions, locale }: RecentTransactionsProps) {
  return (
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
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
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
              {index < transactions.length - 1 && (
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
  );
}

