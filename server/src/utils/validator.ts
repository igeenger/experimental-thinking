import type { Schema } from 'jsonschema'

import { validate as validateData } from 'jsonschema'

/***
 * @throws "invalid data"
*/
export const validate = <T>(data: T, validator: Schema['properties']): T => {
  const result = validateData(data, {
    properties: validator
  })

  if (!result.valid) {
    throw new Error('invalid data')
  }

  return data
}
