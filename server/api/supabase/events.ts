// server/api/supabase/events.ts
import { createClient } from '@supabase/supabase-js';
import {defineEventHandler, createError} from 'h3';

// Initialize Supabase client (better to move to a lib file for reuse)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

// export default {
    // function get(event){
        // 
    // }
// }

export default defineEventHandler(async (event) => {
  try {
    // Example: GET request, fetch all events
    const { data, error } = await supabase
      .from('events')
      .select('*')

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    return {
      success: true,
      events: data,
    }
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Unexpected error occurred',
    }
  }
})
