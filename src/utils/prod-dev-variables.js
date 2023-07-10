/* eslint-disable no-undef */
export const isProduction = process.env.NODE_ENV === 'production'

export const API_ADMIN_URL = isProduction ? 'https://serverless-pink-theta.vercel.app/api/user' : 'http://localhost:5000/api/user'
