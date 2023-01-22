import type { GoogleAuth } from 'google-auth-library'
import { google, type sheets_v4 } from 'googleapis'
import Queue from 'promise-queue'

import { config } from '@/config'
import type { User } from '@/types'
import { UserOutput } from '@/common/api'

const reconnectCount = 3

interface GetRows {
  range: string
}

interface AppendRows {
  range: string
  values: unknown[][]
}

interface UpdateCell {
  range: string
  value: unknown
}

export type AddEmailOptions = {
  id: string
  email: string
}

export type IGoogleTableDatabase = {
  loadUsedIPs(): Promise<string[]>
  appendUser(user: User, isRepeating: boolean): Promise<void>
  users(): Promise<UserOutput[]>
}

class GoogleTableDatabase implements IGoogleTableDatabase {
  private _queue = new Queue(1)

  constructor(
    private _gs: sheets_v4.Resource$Spreadsheets,
    private _auth: GoogleAuth
  ) {}

  /* google api */

  private async _getRows({ range }: GetRows) {
    const getResult = await this._gs.values.get({
      auth: this._auth,
      spreadsheetId: config.env.spreadsheet.id,
      range,
    })
  
    return getResult.data.values
  }

  private async _getRow({ range }: GetRows): Promise<string[]> {
    const values = await this._getRows({ range })
    return values?.map(row => String(row[0])) ?? []
  }

  private async _appendRows(...rows: AppendRows[]) {
    let error: unknown

    for (let requestNumber = 1; requestNumber <= reconnectCount; requestNumber++) {
      try {
        return this._queue.add(() => Promise.all(
          rows.map(({ range, values }) => (
            this._gs.values.append({
              auth: this._auth,
              spreadsheetId: config.env.spreadsheet.id,
              valueInputOption: 'USER_ENTERED',

              range,
              ...{
                resource: {
                  values
                },
              }
            })
          ))
        ))
      } catch (e) {
        error = e
      }
    }

    throw error
  }

  private async _updateCell({ range, value }: UpdateCell) {
    await this._gs.values.update(
      {
        auth: this._auth,
        spreadsheetId: config.env.spreadsheet.id,
        range,
        valueInputOption: 'USER_ENTERED',
        ...{
          resource: {
            // range,
            majorDimension: 'ROWS',
            values: [[value]]
          }
        }
      }
    )
  }

  /* public */

  async loadUsedIPs(): Promise<string[]> {
    return this._getRow({
      range: config.static.spreadsheets.users + '!H2:H'
    })
  }

  async appendUser(user: User, isRepeating: boolean): Promise<void> {
    const resultPercent = user.attempts.reduce((n1, n2) => n1 + n2) / user.attempts.length

    await this._appendRows(
      {
        range: config.static.spreadsheets.users,
        values: [
          [
            user.name,
            user.sex,
            user.age,
            user.mood,
            resultPercent,
            isRepeating,
            user.id,
            user.ip,
          ]
        ]
      },
      {
        range: config.static.spreadsheets.results,
        values: [
          [
            user.variant,
            ...user.attempts,
            resultPercent,
            isRepeating,
            user.id,
          ]
        ]
      },
    )
  }

  async users(): Promise<UserOutput[]> {
    const users = await this._getRows({
      range: config.static.spreadsheets.users + '!A2:G'
    })

    if (!users) {
      return []
    }

    return users.map((row: string[]) => ({
      id: row[6],
      name: row[0],
      points: Number(row[4].replace('%', '')) / 100 * 500
    }))
  }
}

export const connectGoogleTable = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: config.env.spreadsheet.credentials,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  })

  const gs = google.sheets({
    version: 'v4',
    auth: await auth.getClient(),
  }).spreadsheets

  return new GoogleTableDatabase(gs, auth)
}
