import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
'https://ayfnzgzagwgseurnhwbf.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Zm56Z3phZ3dnc2V1cm5od2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3NDk3NDcsImV4cCI6MTk5NTMyNTc0N30.hKKSye6Cacgespk9WbrQU9by8m5MFlaPIDdcC8DU080'
)