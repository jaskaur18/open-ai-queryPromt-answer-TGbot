import { Bot } from 'grammy'
import Context, { Api } from '@/models/Context'
import env from '@/helpers/env'

const bot = new Bot<Context, Api>(env.TOKEN)

export default bot
