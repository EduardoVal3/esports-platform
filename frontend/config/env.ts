// Environment configuration with type safety

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || fallback || '';
};

export const env = {
  // API
  NEXT_PUBLIC_API_URL: getEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3001'),
  
  // App
  NEXT_PUBLIC_APP_NAME: getEnv('NEXT_PUBLIC_APP_NAME', 'eSports Hub'),
  NEXT_PUBLIC_APP_DESCRIPTION: getEnv('NEXT_PUBLIC_APP_DESCRIPTION', 'The ultimate eSports platform'),
  
  // Environment
  NODE_ENV: getEnv('NODE_ENV', 'development') as 'development' | 'production' | 'test',
} as const;
