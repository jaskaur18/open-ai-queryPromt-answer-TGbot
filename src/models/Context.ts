import { Api as BaseApi, Context as BaseContext } from 'grammy'
import { FluentContextFlavor } from '@grammyjs/fluent'
import { HydrateApiFlavor, HydrateFlavor } from '@grammyjs/hydrate'

class MyContext extends BaseContext {
  //isAdmin is boolean
  isAdmin!: boolean
}

type Context = HydrateFlavor<MyContext> & FluentContextFlavor
export type Api = HydrateApiFlavor<BaseApi>
export default Context
