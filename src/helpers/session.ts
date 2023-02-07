import { session as session_ } from 'grammy'

export interface Session {
  admins: number[]
  loop: boolean
}

export const initial = (): Session => ({ admins: [], loop: false })

export const session = session_({ initial })
