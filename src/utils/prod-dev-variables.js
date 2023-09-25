/* eslint-disable no-undef */
export const isProduction = process.env.NODE_ENV === 'production'

export const API_ADMIN_URL = isProduction
  ? 'optometry-back.vercel.app/api/user'
  : 'http://localhost:5001/api/user'
