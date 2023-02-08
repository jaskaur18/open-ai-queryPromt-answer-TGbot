import { Composer } from 'grammy'
import Context from '@/models/Context'
import handleHelp from '@/handlers/commands/help'
import handleLanguage from '@/handlers/commands/language'
import handleStart from '@/handlers/commands/start'
import handlequery from '@/handlers/commands/query'

const CommandsHanlder = new Composer<Context>()

CommandsHanlder.command('start', handleStart)
CommandsHanlder.command('help', handleHelp)
CommandsHanlder.command('language', handleLanguage)
CommandsHanlder.command(['proposal', 'Proposal', 'PROPOSAL'], handlequery)

export default CommandsHanlder
