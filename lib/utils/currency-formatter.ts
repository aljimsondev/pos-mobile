// Type definitions for currency formatter options
interface CurrencyFormatterOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  style?: 'currency' | 'decimal' | 'percent';
}

// Main currency formatter function
export const currencyFormatter = (
  amount: string | number,
  options: CurrencyFormatterOptions = {},
): string | undefined => {
  if (amount === undefined) return;
  // Default options
  const defaults: Required<CurrencyFormatterOptions> = {
    currency: 'USD',
    locale: 'en-US',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
  };

  // Merge options with defaults
  const config: Required<CurrencyFormatterOptions> = {
    ...defaults,
    ...options,
  };

  // Handle string input - convert to number
  let numericAmount: number;
  if (typeof amount === 'string') {
    // Remove any existing currency symbols, commas, and whitespace
    const cleanAmount = amount.replace(/[$,\s]/g, '');
    numericAmount = parseFloat(cleanAmount);
  } else {
    numericAmount = Number(amount);
  }

  // Check if the conversion resulted in a valid number
  if (isNaN(numericAmount)) {
    throw new Error(
      'Invalid amount provided. Please provide a valid number or numeric string.',
    );
  }

  // Use Intl.NumberFormat for proper formatting
  try {
    const formatter = new Intl.NumberFormat(config.locale, {
      style: config.style,
      currency: config.currency,
      minimumFractionDigits: config.minimumFractionDigits,
      maximumFractionDigits: config.maximumFractionDigits,
    });

    return formatter.format(numericAmount);
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    console.warn(
      'Intl.NumberFormat failed, using fallback formatting:',
      (error as Error).message,
    );
    return `$${numericAmount.toFixed(2)}`;
  }
};

// Type for amount input
type AmountInput = string | number;

// Utility functions with proper typing
export const formatUSD = (amount: AmountInput) =>
  currencyFormatter(amount, { currency: 'USD', locale: 'en-US' });

export const formatPHP = (amount: AmountInput) =>
  currencyFormatter(amount, { currency: 'PHP', locale: 'en-US' });

export const formatEUR = (amount: AmountInput) =>
  currencyFormatter(amount, { currency: 'EUR', locale: 'de-DE' });

export const formatGBP = (amount: AmountInput) =>
  currencyFormatter(amount, { currency: 'GBP', locale: 'en-GB' });

export const formatJPY = (amount: AmountInput) =>
  currencyFormatter(amount, { currency: 'JPY', locale: 'ja-JP' });

export const formatCAD = (amount: AmountInput) =>
  currencyFormatter(amount, { currency: 'CAD', locale: 'en-CA' });

// Function to format without currency symbol (just number formatting)
export const numberFormatter = (
  amount: AmountInput,
  options: Omit<CurrencyFormatterOptions, 'currency'> = {},
) => {
  return currencyFormatter(amount, { ...options, style: 'decimal' });
};

// Advanced formatter with more specific options
interface AdvancedFormatterOptions extends CurrencyFormatterOptions {
  showCurrencyCode?: boolean;
  useGrouping?: boolean;
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
}

export const advancedCurrencyFormatter = (
  amount: AmountInput,
  options: AdvancedFormatterOptions = {},
): string => {
  const {
    showCurrencyCode = false,
    useGrouping = true,
    signDisplay = 'auto',
    ...restOptions
  } = options;

  const config: Required<CurrencyFormatterOptions> = {
    currency: 'USD',
    locale: 'en-US',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    ...restOptions,
  };

  let numericAmount: number;
  if (typeof amount === 'string') {
    const cleanAmount = amount.replace(/[$,\s]/g, '');
    numericAmount = parseFloat(cleanAmount);
  } else {
    numericAmount = Number(amount);
  }

  if (isNaN(numericAmount)) {
    throw new Error(
      'Invalid amount provided. Please provide a valid number or numeric string.',
    );
  }

  try {
    const formatter = new Intl.NumberFormat(config.locale, {
      style: config.style,
      currency: config.currency,
      minimumFractionDigits: config.minimumFractionDigits,
      maximumFractionDigits: config.maximumFractionDigits,
      currencyDisplay: showCurrencyCode ? 'code' : 'symbol',
      useGrouping,
      signDisplay,
    });

    return formatter.format(numericAmount);
  } catch (error) {
    console.warn(
      'Intl.NumberFormat failed, using fallback formatting:',
      (error as Error).message,
    );
    return `$${numericAmount.toFixed(2)}`;
  }
};

// Example usage with type annotations:
/*
// Basic usage
const price1: string = currencyFormatter("1234.56");           // "$1,234.56"
const price2: string = currencyFormatter(1234);                // "$1,234.00"

// With custom options
const euroPrice: string = currencyFormatter("1234.56", { 
  currency: 'EUR', 
  locale: 'de-DE' 
});  // "1.234,56 €"

// Using utility functions
const usdPrice: string = formatUSD("1234.56");                 // "$1,234.56"
const gbpPrice: string = formatGBP(1234.56);                   // "£1,234.56"

// Advanced formatting
const advancedPrice: string = advancedCurrencyFormatter("1234.56", {
  currency: 'USD',
  locale: 'en-US',
  showCurrencyCode: true,
  signDisplay: 'always'
});  // "+USD 1,234.56"

// Number formatting without currency
const numberOnly: string = numberFormatter("1234.567", { 
  maximumFractionDigits: 3 
});  // "1,234.567"
*/
