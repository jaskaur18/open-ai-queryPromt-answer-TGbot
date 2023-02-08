import { Menu } from '@grammyjs/menu'
import ISO6391 from 'iso-639-1'

import { locales } from '@/helpers/i18n'
import { userLanguage } from '@/helpers/constant'
import Context from '@/models/Context'

const keyboard = new Menu<Context>('language')

for (let index = 1; index <= locales.length; index += 1) {
  const code = locales[index - 1]

  keyboard.text(
    {
      text: (ctx) => {
        if (!ctx.from) return 'Error'

        const isActivated = ctx.from?.language_code === code

        return `${isActivated ? '✅ ' : ''}${ISO6391.getNativeName(code)}`
      },
      payload: code,
    },
    async (ctx) => {
      if (!ctx.from) return 'Error'

      const newLanguageCode = ctx.match

      if (locales.includes(newLanguageCode)) {
        // user.language = newLanguageCode
        // await user.save()

        await ctx.fluent.renegotiateLocale()

        await ctx.editMessageText(ctx.t('language_changed'), {
          reply_markup: keyboard,
        })

        userLanguage.set(ctx.from.id, newLanguageCode)
      }
    }
  )

  if (index % 2 === 0) {
    keyboard.row()
  }
}

export default keyboard
