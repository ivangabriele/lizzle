import { IRON_SESSION_OPTIONS } from '@backend/constants'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async (req, res) => {
  req.session.destroy()

  res.send({ ok: true })
}, IRON_SESSION_OPTIONS)
