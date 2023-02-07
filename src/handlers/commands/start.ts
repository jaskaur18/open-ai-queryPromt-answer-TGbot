import { findOrCreateUser } from '@/models/User'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStart(ctx: Context) {
  if (!ctx.from) return

  await findOrCreateUser(
    ctx.from.id,
    ctx.from.username,
    ctx.from.first_name,
    ctx.from.last_name
  )
  return ctx.reply(ctx.t('welcome'), sendOptions(ctx))
}
