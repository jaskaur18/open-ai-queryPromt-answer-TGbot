import { Configuration, OpenAIApi } from 'openai'
import AdminIds, { openaiModelId } from '@/helpers/constant'
import bot from '@/helpers/bot'
import env from '@/helpers/env'

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// generate response from provided prompt
export const generateResponse = async (prompt: string) => {
  try {
    const _prompt =
      "Rewrite The Content Below WIth Different Words And Variation Of Tone But Keep The Context Of The Text Without Altering The Meaning Keep Links And Username Don't Remove Them And Make New Response Each Time:\n\n" +
      prompt
    return openai.createCompletion(
      {
        model: openaiModelId,
        prompt: _prompt,
        max_tokens: 1000,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        timeout: 20 * 1000,
      }
    )
  } catch (error) {
    await AdminIds.forEach((id) => {
      return bot.api.sendMessage(
        id,
        `Error Happened in OpenAI: ${error} For Prompt: ${prompt}`
      )
    })
  }
  return false
}
export default openai
