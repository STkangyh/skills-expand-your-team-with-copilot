/**
 * Enhanced error handling for Supabase operations
 * Provides user-friendly error messages and troubleshooting guidance
 */

export interface SupabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
}

interface EnhancedError extends Error {
  originalError?: unknown;
}

/**
 * Helper function to get a normalized error string for checking
 */
function getNormalizedErrorString(error: unknown): string {
  if (!error) return '';
  const errorMessage = (error as Error).message?.toLowerCase() || '';
  const errorString = String(error).toLowerCase();
  return `${errorMessage} ${errorString}`;
}

/**
 * Determines if an error is a CORS-related error
 */
export function isCorsError(error: unknown): boolean {
  if (!error) return false;
  
  const normalized = getNormalizedErrorString(error);
  
  return (
    normalized.includes('cors') ||
    normalized.includes('cross-origin') ||
    normalized.includes('access-control-allow-origin')
  );
}

/**
 * Determines if an error is an RLS policy error
 */
export function isRlsError(error: unknown): boolean {
  if (!error) return false;
  
  const errorMessage = (error as Error).message?.toLowerCase() || '';
  const errorCode = (error as SupabaseError).code || '';
  
  return (
    errorMessage.includes('row-level security') ||
    errorMessage.includes('rls') ||
    errorMessage.includes('policy') ||
    errorCode === '42501' // PostgreSQL insufficient privilege error
  );
}

/**
 * Determines if an error is a network/connectivity error
 */
export function isNetworkError(error: unknown): boolean {
  if (!error) return false;
  
  const normalized = getNormalizedErrorString(error);
  
  return (
    normalized.includes('network') ||
    normalized.includes('failed to fetch') ||
    normalized.includes('networkerror') ||
    normalized.includes('err_failed')
  );
}

/**
 * Provides a user-friendly error message with troubleshooting guidance
 */
export function getEnhancedErrorMessage(error: unknown): string {
  if (!error) {
    return 'An unknown error occurred. Please try again.';
  }

  // CORS errors
  if (isCorsError(error)) {
    return (
      '🔒 CORS Policy Error: Unable to connect to Supabase.\n\n' +
      'This usually means your Supabase Row Level Security (RLS) policies need to be configured.\n\n' +
      '✅ Quick Fix:\n' +
      '1. Go to your Supabase SQL Editor\n' +
      '2. Run: ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;\n' +
      '3. Add policies for SELECT, INSERT, UPDATE, DELETE operations\n\n' +
      '📖 See CORS_TROUBLESHOOTING.md for detailed instructions.'
    );
  }

  // RLS policy errors
  if (isRlsError(error)) {
    return (
      '🔐 Permission Error: Row Level Security policy blocks this operation.\n\n' +
      'Your Supabase table has RLS enabled but no policy allows this operation.\n\n' +
      '✅ Quick Fix:\n' +
      '1. Go to Supabase SQL Editor\n' +
      '2. Add RLS policies for the operation you\'re trying to perform\n' +
      '3. For testing, you can temporarily disable RLS:\n' +
      '   ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;\n\n' +
      '⚠️ Warning: Disabling RLS makes your data completely public!\n\n' +
      '📖 See CORS_TROUBLESHOOTING.md for secure policy examples.'
    );
  }

  // Network errors
  if (isNetworkError(error)) {
    return (
      '🌐 Network Error: Unable to reach Supabase.\n\n' +
      'This could be due to:\n' +
      '• No internet connection\n' +
      '• Incorrect Supabase URL\n' +
      '• Supabase service issues\n\n' +
      '✅ Try:\n' +
      '1. Check your internet connection\n' +
      '2. Verify NEXT_PUBLIC_SUPABASE_URL in your environment variables\n' +
      '3. Check Supabase status: https://status.supabase.com/\n\n' +
      '📖 See DEPLOYMENT_GUIDE.md for configuration help.'
    );
  }

  // Generic error with the actual message
  const errorMessage = (error as Error).message || String(error);
  return (
    `❌ Error: ${errorMessage}\n\n` +
    'If this error persists, please check:\n' +
    '• Your Supabase configuration\n' +
    '• Environment variables are set correctly\n' +
    '• RLS policies are configured\n\n' +
    '📖 See CORS_TROUBLESHOOTING.md and DEPLOYMENT_GUIDE.md for help.'
  );
}

/**
 * Logs error details to console for debugging
 */
export function logErrorDetails(error: unknown, operation: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 Supabase Error: ${operation}`);
    console.error('Error object:', error);
    console.log('Error type:', {
      isCors: isCorsError(error),
      isRls: isRlsError(error),
      isNetwork: isNetworkError(error),
    });
    console.log('Troubleshooting:', getEnhancedErrorMessage(error));
    console.groupEnd();
  }
}

/**
 * Wraps a Supabase operation with enhanced error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<{ data: T | null; error: unknown }>,
  operationName: string
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const result = await operation();
    
    if (result.error) {
      logErrorDetails(result.error, operationName);
      
      // Create an enhanced error with user-friendly message
      const enhancedError = new Error(getEnhancedErrorMessage(result.error)) as EnhancedError;
      enhancedError.originalError = result.error;
      
      return { data: null, error: enhancedError };
    }
    
    // Return data with no error
    return { data: result.data, error: null };
  } catch (err) {
    logErrorDetails(err, operationName);
    
    const enhancedError = new Error(getEnhancedErrorMessage(err)) as EnhancedError;
    enhancedError.originalError = err;
    
    return { data: null, error: enhancedError };
  }
}

/**
 * Formats error for display in UI
 */
export function formatErrorForUI(error: unknown): {
  title: string;
  message: string;
  type: 'cors' | 'rls' | 'network' | 'generic';
} {
  if (isCorsError(error)) {
    return {
      title: 'CORS Policy Error',
      message: 'Unable to connect to Supabase. Please check your RLS policies. See CORS_TROUBLESHOOTING.md for help.',
      type: 'cors',
    };
  }

  if (isRlsError(error)) {
    return {
      title: 'Permission Denied',
      message: 'Row Level Security policy blocks this operation. Please configure your RLS policies.',
      type: 'rls',
    };
  }

  if (isNetworkError(error)) {
    return {
      title: 'Network Error',
      message: 'Unable to reach Supabase. Check your connection and configuration.',
      type: 'network',
    };
  }

  return {
    title: 'Error',
    message: (error as Error).message || 'An unexpected error occurred. Please try again.',
    type: 'generic',
  };
}
