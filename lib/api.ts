const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_BASE = configuredApiUrl && configuredApiUrl !== 'http://localhost:5000' && configuredApiUrl !== 'http://127.0.0.1:5000'
  ? configuredApiUrl
  : 'https://trust-website-backend.onrender.com';
