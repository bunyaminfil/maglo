"use client";

import Link from "next/link";
import { formatCurrency, formatDate, SupportedLocale } from "@/lib/formatting";

interface Transfer {
  id: string;
  name: string;
  date: string;
  amount: number;
  currency: string;
  image?: string;
}

interface ScheduledTransfersProps {
  transfers: Transfer[];
  locale: SupportedLocale;
}

export function ScheduledTransfers({ transfers, locale }: ScheduledTransfersProps) {
  return (
    <div className="px-6 mt-36 pb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#1B212D]">Scheduled Transfers</h2>
        <Link href="/dashboard" className="text-sm font-semibold text-[#29A073] hover:underline">View All &gt;</Link>
      </div>

      <div className="space-y-0">
        {transfers.length > 0 ? (
          transfers.slice(0, 5).map((transfer, index) => (
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
              {index < transfers.slice(0, 5).length - 1 && (
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
  );
}

