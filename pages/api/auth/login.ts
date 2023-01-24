import { IRON_SESSION_OPTIONS } from '@backend/constants'
import crypto from 'crypto'
import { withIronSessionApiRoute } from 'iron-session/next'

import type { Session } from '@backend/types/Session'
import type { NextApiRequest, NextApiResponse } from 'next'

const base64URLEncode = (buffer: Buffer) =>
  buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

const createOauthCodeChallenge = (oauthCode: string) => base64URLEncode(sha256(oauthCode))

const createOauthCodeVerifier = () => base64URLEncode(crypto.randomBytes(32))

const sha256 = (text: string) => crypto.createHash('sha256').update(text).digest()

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const oauthCodeVerifier = createOauthCodeVerifier()
    const oauthCodeChallenge = createOauthCodeChallenge(oauthCodeVerifier)

    ;(req.session as Session.Data).oauth = {
      codeVerifier: oauthCodeVerifier,
    }

    await req.session.save()

    const searchParams = {
      client_id: String(process.env.LICHESS_API_CLIENT_ID),
      code_challenge: oauthCodeChallenge,
      code_challenge_method: 'S256',
      redirect_uri: `${process.env.BASE_URL}/`,
      response_type: 'code',
      scope: ['email:read', 'preference:read', 'puzzle:read'].join(' '),
    }
    res.redirect(`https://lichess.org/oauth?${new URLSearchParams(searchParams)}`)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.debug('[pages/api/puzzles/index.ts]', '[ERROR]', String(err))
    // eslint-disable-next-line no-console
    console.debug('[pages/api/puzzles/index.ts]', '[DEBUG]', err)

    res.status(400).json({
      hasError: true,
      message: 'Something went wrong.',
      status: 400,
    })
  }
}, IRON_SESSION_OPTIONS)
