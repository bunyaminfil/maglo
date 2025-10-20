import React from 'react';

// Loading Spinner Component
export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  text = 'Loading...' 
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    white: 'border-white'
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-transparent rounded-full animate-spin ${colorClasses[color]}`}></div>
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
}

// Loading Skeleton Component
export function LoadingSkeleton({ 
  lines = 3, 
  height = 'h-4',
  className = '' 
}: {
  lines?: number;
  height?: string;
  className?: string;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={`${height} bg-gray-200 rounded mb-2 ${index === lines - 1 ? 'w-3/4' : ''}`}></div>
      ))}
    </div>
  );
}

// Success Message Component
export function SuccessMessage({ 
  message, 
  onClose,
  duration = 5000 
}: {
  message: string;
  onClose?: () => void;
  duration?: number;
}) {
  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-green-800 font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-green-600 hover:text-green-800"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Error Message Component
export function ErrorMessage({ 
  message, 
  onClose,
  onRetry,
  duration = 0 
}: {
  message: string;
  onClose?: () => void;
  onRetry?: () => void;
  duration?: number;
}) {
  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-red-800 font-medium">Error</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-red-700 text-sm mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-red-600 hover:text-red-800 text-sm font-medium underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}

// API Status Indicator Component
export function ApiStatusIndicator({ 
  isLoading, 
  isSuccess, 
  isError, 
  lastUpdated,
  className = '' 
}: {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  lastUpdated?: Date;
  className?: string;
}) {
  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 text-blue-600 ${className}`}>
        <LoadingSpinner size="sm" color="primary" text="" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`flex items-center gap-2 text-red-600 ${className}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">Error</span>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">
          {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Success'}
        </span>
      </div>
    );
  }

  return null;
}

// Loading Overlay Component
export function LoadingOverlay({ 
  isLoading, 
  children,
  message = 'Loading...' 
}: {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" color="primary" text="" />
            <span className="text-gray-600 font-medium">{message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Retry Button Component
export function RetryButton({ 
  onRetry, 
  isLoading = false,
  className = '' 
}: {
  onRetry: () => void;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onRetry}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" color="white" text="" />
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )}
      <span>{isLoading ? 'Retrying...' : 'Retry'}</span>
    </button>
  );
}
