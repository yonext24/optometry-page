/* eslint-disable no-undef */
export const isProduction = process.env.NODE_ENV === 'production'

export const API_ADMIN_URL = isProduction
  ? 'https://optometry-back-mt82341pk-yonext24.vercel.app/api/user'
  : 'http://localhost:5001/api/user'
