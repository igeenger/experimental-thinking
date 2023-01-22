import { Cash, createRamCash } from './cash'
import { connectGoogleTable, IGoogleTableDatabase } from './database'

export type Context = {
  cash: Cash
  db: IGoogleTableDatabase
}

export const createContext = async (): Promise<Context> => {
  const db = await connectGoogleTable()

  const cash = createRamCash(
    await db.loadUsedIPs()
  )
  
  return {
    cash,
    db,
  }
}
