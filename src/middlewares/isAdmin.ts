import { NextFunction } from 'grammy'
import AdminIds from '@/helpers/constant'
import Context from '@/models/Context'

export default function isAdmin(ctx: Context, next: NextFunction) {
  ctx.isAdmin = AdminIds.includes(`${ctx.from?.id}`)
  return next()
}
