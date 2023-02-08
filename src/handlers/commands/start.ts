import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleStart(ctx: Context) {
  if (!ctx.from) return
  return ctx.reply(ctx.t('welcome'), sendOptions(ctx))
}
