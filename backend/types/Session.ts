export namespace Session {
  export interface Data {
    oauth?: {
      codeVerifier: string
    }
    user?: {
      id: string
      isAdmin: boolean
      username: string
    }
  }
}
