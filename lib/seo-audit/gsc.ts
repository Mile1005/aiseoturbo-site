// GSC functionality temporarily disabled
export async function fetchGscInsightsForUrl(): Promise<unknown> {
  return {
    available: false,
    top_queries: [],
    ctr: null,
    impressions: null,
    clicks: null,
    message: "GSC functionality temporarily disabled.",
  };
}

// Helper function to check if GSC is configured
export function isGscConfigured(): boolean {
  return false;
}

// Helper function to check if we have any tokens stored
export async function hasGscTokens(): Promise<boolean> {
  return false;
}

// Helper function to validate GSC tokens and check if they're working
export async function validateGscTokens(): Promise<{ isValid: boolean; hasProperties: boolean; message: string }> {
  return { isValid: false, hasProperties: false, message: "GSC functionality temporarily disabled" };
}
