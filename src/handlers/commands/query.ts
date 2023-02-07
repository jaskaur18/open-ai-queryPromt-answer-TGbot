import { generateResponse } from '@/helpers/openai'
import Context from '@/models/Context'
import UserModel from '@/models/User'
import sendOptions from '@/helpers/sendOptions'

export default async function handlequery(ctx: Context) {
  if (!ctx.from) return
  const user = await UserModel.getUserByTelegramId(ctx.from.id)
  if (!user) return
  if (!ctx.isAdmin && !user.allowed) return ctx.reply(ctx.t('error.notallowed'))

  const query = ctx.msg?.text?.split(' ').slice(1).join(' ')

  if (!query) return ctx.reply(ctx.t('error.noquery'))

  const loadingMsg = await ctx.reply(ctx.t('query.loading'), sendOptions(ctx))

  const response = await generateResponse(query)
  if (!response) return ctx.reply(ctx.t('error.noresponse'))

  console.log(response.data)

  const message = `Response For Query: ${query}\n${response.data.choices[0].text}`
  return loadingMsg.editText(message)
}
