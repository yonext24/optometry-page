export const isProduction = process.env.NODE_ENV === 'production'

export const API_ADMIN_URL = isProduction ? '' : 'http://localhost:8000/'
