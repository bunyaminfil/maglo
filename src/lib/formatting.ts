import Currency from 'currency.js';

export type SupportedCurrency = 'USD' | 'EUR' | 'TRY' | 'GBP';

export interface CurrencyFormatOptions {
  currency?: SupportedCurrency | string;
  locale?: string;
  showSymbol?: boolean;
  precision?: number;
}

const DEFAULT_CURRENCY: SupportedCurrency = 'USD';
// Supported locales for internationalization
export type SupportedLocale = 'en-US' | 'tr-TR' | 'de-DE' | 'fr-FR' | 'es-ES';

const DEFAULT_LOCALE: SupportedLocale = 'en-US';

// Currency symbol to ISO code mapping
const CURRENCY_MAP: Record<string, SupportedCurrency> = {
  '$': 'USD',
  'USD': 'USD',
  '€': 'EUR',
  'EUR': 'EUR',
  '₺': 'TRY',
  'TRY': 'TRY',
  '£': 'GBP',
  'GBP': 'GBP',
};

function normalizeCurrency(currency: string): SupportedCurrency {
  return CURRENCY_MAP[currency] || DEFAULT_CURRENCY;
}

export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    showSymbol = true,
    precision = 2,
  } = options;

  // Normalize currency symbol to ISO code
  const normalizedCurrency = normalizeCurrency(currency);
  const currencyObj = Currency(amount, { precision });
  
  if (showSymbol) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: normalizedCurrency,
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(currencyObj.value);
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(currencyObj.value);
}

export function formatNumber(
  amount: number,
  locale: string = DEFAULT_LOCALE,
  precision: number = 2
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(amount);
}

export function formatDate(
  date: string | Date,
  locale: SupportedLocale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

export function formatRelativeDate(
  date: string | Date,
  locale: SupportedLocale = DEFAULT_LOCALE
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use Intl.DateTimeFormat for proper internationalization
  const formatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return formatter.format(dateObj);
}

export function getCurrencySymbol(currency: SupportedCurrency): string {
  const symbols: Record<SupportedCurrency, string> = {
    USD: '$',
    EUR: '€',
    TRY: '₺',
    GBP: '£',
  };
  return symbols[currency];
}

export function convertCurrency(
  amount: number,
  fromCurrency: SupportedCurrency,
  toCurrency: SupportedCurrency,
  exchangeRate: number
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  const currencyObj = Currency(amount);
  return currencyObj.multiply(exchangeRate).value;
}
