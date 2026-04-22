function requireEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  MAILJET_APIKEY: requireEnv("MAILJET_APIKEY"),
  MAILJET_SECRETKEY: requireEnv("MAILJET_SECRETKEY"),
  MAILJET_API: requireEnv("MAILJET_API"),
} as const;
