import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { development, production } from '@/helpers/launch'
import { hydrate, hydrateApi } from '@grammyjs/hydrate'
import { limit } from '@grammyjs/ratelimiter'
import { loadLocales } from '@/helpers/i18n'
import CommandsHandler from '@/handlers/commands'
import bot from '@/helpers/bot'
import configurefluent from '@/middlewares/configurefluent'
import env from '@/helpers/env'
import isAdmin from '@/middlewares/isAdmin'
import languageMenu from '@/menus/language'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    // Middlewares
    .use(limit())
    .use(hydrate())
    // Add fluent middleware to the bot
    .use(configurefluent())
    .use(isAdmin)
    // Menus
    .use(languageMenu)
    // Commands
    .use(CommandsHandler)

  bot.api.config.use(hydrateApi())

  await loadLocales()
  await (env.isDev ? development(bot) : production(bot))
}

void runApp()
