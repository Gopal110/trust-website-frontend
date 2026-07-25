// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — change URLs here only
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTION_API  = 'https://trust-website-backend.onrender.com';
const LOCAL_API       = 'http://localhost:5000';

// Priority order:
//  1. NEXT_PUBLIC_API_URL env var (if explicitly set in Vercel/local .env)
//  2. Auto-detect: production build → Render URL, dev → localhost
export const API_BASE: string =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production' ? PRODUCTION_API : LOCAL_API);
