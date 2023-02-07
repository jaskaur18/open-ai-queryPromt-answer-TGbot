import { connect, set } from 'mongoose'
import env from '@/helpers/env'

function startMongo() {
  set('strictQuery', true)
  return connect(env.MONGO)
}

export default startMongo
