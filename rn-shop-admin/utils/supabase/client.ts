import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// This code came from auth set up for server side auth with supabase in nextjs project 
// Creates a Supabase client for the frontend.
// we add Database from our supabase types to strongly type the Supabase client with your project's specific database schema.
// function will have to be called to use.