import type { WithContext } from '@/utils/use-context'
import type { Context } from '@/context'
import type { WithSession } from '@/utils/use-cookie-user'
import type { User } from '@/types'

declare global {
  namespace Express {
    export interface Request extends 
      WithContext<Context>,
      WithSession<User>
    {}
  }
}
