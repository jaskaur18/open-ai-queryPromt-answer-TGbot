import { LocaleNegotiator, useFluent } from '@grammyjs/fluent'

import { fluent } from '@/helpers/i18n'
import { userLanguage } from '@/helpers/constant'
import Context from '@/models/Context'
import UserModel from '@/models/User'

const localeNegotiator = async (ctx: Context) => {
  if (!ctx.from) return ctx.chat && 'en'
  const lang = userLanguage.get(ctx.from?.id)
  if (lang) return (ctx.chat && lang) || ctx.from?.language_code
  const user = await UserModel.getUserByTelegramId(ctx.from.id)
  if (!user) return (ctx.chat && 'en') || ctx.from?.language_code
  userLanguage.set(ctx.from.id, user.language)
  return (ctx.chat && user.language) || ctx.from?.language_code
}

const middleware = () => {
  return useFluent({
    fluent,
    localeNegotiator: localeNegotiator as LocaleNegotiator<Context>,
    defaultLocale: 'en',
  })
}
export default middleware
