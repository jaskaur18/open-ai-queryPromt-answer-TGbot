import env from '@/helpers/env'

export const userLanguage = new Map<number, string>()
export const openaiModelId = 'text-davinci-003'

const AdminIds: string[] = env.ADMIN_IDS.split(',')
export default AdminIds
