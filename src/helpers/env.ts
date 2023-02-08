import * as dotenv from 'dotenv'
import { cleanEnv, str } from 'envalid'

//{ path: resolve(cwd(), '.env') }
dotenv.config()

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  TOKEN: str(),

  OPENAI_API_KEY: str(),

  ADMIN_IDS: str(),
  RAILWAY_STATIC_URL: str(),
})
