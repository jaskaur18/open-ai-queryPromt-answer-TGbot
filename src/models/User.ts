import * as crypto from 'crypto'
import {
  ReturnModelType,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: string

  @prop({ required: true })
  telegramId!: number

  @prop({ required: false, default: 'none', lowercase: true })
  username!: string

  @prop({ required: true, lowercase: true })
  first_name!: string

  @prop({ required: false, lowercase: true })
  last_name!: string

  @prop({ required: true, default: 'en' })
  language!: string

  @prop({ required: true, default: false })
  allowed!: boolean

  public static getUserById(this: ReturnModelType<typeof User>, id: string) {
    return this.findOne({ id: id })
  }

  public static getUserByTelegramId(
    this: ReturnModelType<typeof User>,
    telegramId: number
  ) {
    return this.findOne({ telegramId: telegramId })
  }

  //set allowed to true or false
  public static setAllowed(
    this: ReturnModelType<typeof User>,
    telegramId: number,
    allowed: boolean
  ) {
    return this.findOneAndUpdate({ telegramId: telegramId }, { allowed })
  }
}

const UserModel = getModelForClass(User)

export async function findOrCreateUser(
  telegramId: number,
  username: string | undefined,
  first_name: string,
  last_name: string | undefined
) {
  const user = await UserModel.getUserByTelegramId(telegramId)
  if (user) return user

  const newUser = new UserModel({
    id: crypto.randomUUID(),
    telegramId,
    username,
    first_name,
    last_name,
  })

  await newUser.save()

  return newUser
}

export default UserModel
