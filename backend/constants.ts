import type { IronSessionOptions } from 'iron-session'

export const IRON_SESSION_OPTIONS: IronSessionOptions = {
  cookieName: 'lizzle_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: String(process.env.SESSION_PASSPHRASE),
}
