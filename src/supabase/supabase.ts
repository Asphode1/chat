import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/types'

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default supabase

export const channel = supabase.channel('db-chat', { config: { broadcast: { self: true } } })

channel
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'chat',
    },
    (payload) => console.log(payload)
  )
  .subscribe()
