import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://bmalnhkxiwbaxcclvwhd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtYWxuaGt4aXdiYXhjY2x2d2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgwNzA0MzAsImV4cCI6MTk4MzY0NjQzMH0.AKz1847rS2-gm_XXlwmNVp7RUXO2WTnlk6gukfFFOeo'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
