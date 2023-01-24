export namespace LichessApi {
  enum PlayerTitle {
    BOT = 'BOT',
    CM = 'CM',
    FM = 'FM',
    GM = 'GM',
    IM = 'IM',
    LM = 'LM',
    NM = 'NM',
    WCM = 'WCM',
    WFM = 'WFM',
    WGM = 'WGM',
    WIM = 'WIM',
    WNM = 'WNM',
  }

  export type Account = {
    blocking: boolean
    completionRate: number
    count: {
      ai: number
      all: number
      bookmark: number
      draw: number
      drawH: number
      import: number
      loss: number
      lossH: number
      me: number
      playing: number
      rated: number
      win: number
      winH: number
    }
    createdAt: number
    disabled: boolean
    followable: boolean
    following: boolean
    followsYou: boolean
    id: string
    patron: boolean
    perfs: {
      atomic: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      blitz: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      bullet: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      chess960: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      classical: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      correspondence: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      horde: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      kingOfTheHill: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      puzzle: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      racingKings: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      rapid: { games: number; prog: number; prov: boolean; rating: number; rd: number }
      storm: { runs: number; score: number }
      ultraBullet: { games: number; prog: number; prov: boolean; rating: number; rd: number }
    }
    playTime: {
      total: number
      tv: number
    }
    playing: string
    profile: {
      bio: string
      country: string
      ecfRating: number
      fideRating: number
      firstName: string
      lastName: string
      links: string
      location: string
      uscfRating: number
    }
    seenAt: number
    streaming: boolean
    title: PlayerTitle
    tosViolation: boolean
    url: string
    username: string
    verified: boolean
  }

  export type AccountEmail = {
    email: string
  }

  export type Token = {
    access_token: string
    /** In seconds */
    expires_in: number
    token_type: 'Bearer'
  }
}
