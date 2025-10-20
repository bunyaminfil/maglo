"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { formatCurrency, formatDate } from '@/lib/formatting';

export interface ChartDataPoint {
  date: string;
  income: number;
  expenses: number;
  net: number;
}

interface WorkingCapitalChartProps {
  data: ChartDataPoint[];
  isLoading?: boolean;
  error?: string | null;
  currency?: string;
}

// Loading skeleton component
function ChartLoadingSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="h-[200px] bg-gray-100 rounded-lg animate-pulse"></div>
    </div>
  );
}

// Error state component
function ChartErrorState({ error }: { error: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#1B212D]">Working Capital</h2>
      </div>
      <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-[12px] text-gray-500">Failed to load chart data</p>
          <p className="text-xs text-gray-400 mt-1">{error}</p>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function ChartEmptyState() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#1B212D]">Working Capital</h2>
      </div>
      <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-gray-400 mb-2">📊</div>
          <p className="text-[12px] text-gray-500">No data available</p>
        </div>
      </div>
    </div>
  );
}

// Chart legend component
function ChartLegend() {
  return (
    <div className="flex flex-wrap items-center gap-2 lg:gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#29A073]"></div>
        <span className="text-[12px] text-[#1B212D]">Income</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#C8EE44]"></div>
        <span className="text-[12px] text-[#1B212D]">Expenses</span>
      </div>
      <div className="flex items-center gap-2 text-[12px] text-[#1B212D] bg-[#F8F8F8] px-2 py-1 rounded-[5px]" style={{ width: '107px', height: '30px' }}>
        <span>Last 7 days</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

// Custom tooltip component
function CustomTooltip({ active, payload, label, currency }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
      <p className="text-[12px] font-medium text-gray-900 mb-2">
        {typeof label === 'string' ? label : formatDate(label, 'en-US', { month: 'short', day: 'numeric' })}
      </p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#29A073]"></div>
          <span className="text-[12px] text-[#1B212D]">Income:</span>
          <span className="text-[12px] font-medium text-gray-900">
            {formatCurrency(payload[0]?.value || 0, { currency: currency as any })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#C8EE44]"></div>
          <span className="text-[12px] text-[#1B212D]">Expenses:</span>
          <span className="text-[12px] font-medium text-gray-900">
            {formatCurrency(payload[1]?.value || 0, { currency: currency as any })}
          </span>
        </div>
      </div>
    </div>
  );
}

// Main Line Chart component
export function WorkingCapitalChart({
  data,
  isLoading = false,
  error = null,
  currency = 'USD',
}: WorkingCapitalChartProps) {
  // Handle loading state
  if (isLoading) return <ChartLoadingSkeleton />;
  
  // Handle error state
  if (error) return <ChartErrorState error={error} />;
  
  // Handle empty data
  if (!data || data.length === 0) return <ChartEmptyState />;

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 lg:mb-6 gap-4">
        <h2 className="text-lg font-semibold text-[#1B212D]">Working Capital</h2>
        <ChartLegend />
      </div>
      
      <div className="h-[250px] lg:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: '#929EAE' }}
              interval={0}
              tickFormatter={(value) => 
                typeof value === 'string' 
                  ? value 
                  : formatDate(value, 'en-US', { month: 'short', day: 'numeric' })
              }
            />
            
            <YAxis 
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => 
                formatCurrency(value, { currency: currency as any, showSymbol: false })
              }
            />
            
            <Tooltip content={<CustomTooltip currency={currency} />} />
            
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#4ade80" 
              strokeWidth={2}
              dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4ade80', strokeWidth: 2 }}
            />
            
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#C8EE44" 
              strokeWidth={2}
              dot={{ fill: '#C8EE44', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#C8EE44', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Bar Chart variant
export function WorkingCapitalBarChart({
  data,
  isLoading = false,
  error = null,
  currency = 'USD',
}: WorkingCapitalChartProps) {
  // Reuse line chart for loading/error/empty states
  if (isLoading || error || !data || data.length === 0) {
    return <WorkingCapitalChart data={data} isLoading={isLoading} error={error} currency={currency} />;
  }

  const BarTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-[12px] font-medium text-gray-900 mb-2">
          {typeof label === 'string' ? label : formatDate(label, 'en-US', { month: 'short', day: 'numeric' })}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-[12px] text-[#1B212D]">{entry.name}:</span>
              <span className="text-[12px] font-medium text-gray-900">
                {formatCurrency(entry.value || 0, { currency: currency as any })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#1B212D]">Working Capital</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#29A073]"></div>
            <span className="text-[12px] text-[#1B212D]">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C8EE44]"></div>
            <span className="text-[12px] text-[#1B212D]">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#929EAE' }}
              tickFormatter={(value) => 
                typeof value === 'string' 
                  ? value 
                  : formatDate(value, 'en-US', { month: 'short', day: 'numeric' })
              }
            />
            
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => 
                formatCurrency(value, { currency: currency as any, showSymbol: false })
              }
            />
            
            <Tooltip content={<BarTooltip />} />
            <Legend />
            
            <Bar dataKey="income" fill="#4ade80" name="Income" />
            <Bar dataKey="expenses" fill="#C8EE44" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}