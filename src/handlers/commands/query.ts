import { generateResponse } from '@/helpers/openai'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handlequery(ctx: Context) {
  if (!ctx.from) return

  // const query = ctx.msg?.text?.split(' ').slice(1).join(' ')

  // if (!query) return ctx.reply(ctx.t('error.noquery'))

  const loadingMsg = await ctx.reply(ctx.t('query.loading'), sendOptions(ctx))

  const query = `I am part of the @metamoonshots investors group, led by @eddiemms. We'd be delighted to offer you an incredible opportunity whereby we could help you find additional investors for your project and set up a partnership with our community. If you're keen to learn more, please let me know, and I'll set up a discussion for our team to get further into the details. 

Here are our socials: 
-METAMOONSHOTS
-TG: @metamoonshotschat
-Channel: @metamoonshots
-Twitter: https://twitter.com/metamoonshots 
-Medium.com/@metamoonshots
-Metamoonshots.io

So far, we have partnered with over 400 projects and provided a range of services—from consultation and marketing support to listings and more. If you are interested in pitching your project to our community through an AMA, our prices range from 100-900$. We could talk to you about our various options and decide on the best one for your needs and budget.`

  const response = await generateResponse(query)
  if (!response) return ctx.reply(ctx.t('error.noresponse'))

  const message = `${response.data.choices[0].text}`
  return loadingMsg.editText(message)
}
