import {createClient} from '@supabase/supabase-js';
import {defineEventHandler, createError} from 'h3';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string ,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string 
)

export default defineEventHandler(async (event) => {
    try{
        const {data, error} = await supabase 
        .from('venues')
        .select('*');

        if(error){
            throw createError({
                statusCode: 500,
                statusMessage: error.message
            })
        }

        return {
            success: true,
            data: data
        }

    }catch(e: any){
        return{ 
            success: false,
            message: e.message || 'Unexpected Supabase Error'
        }
    }
})