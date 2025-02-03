

import {createClient} from '@supabase/supabase-js'
const supabaseUrl = 'https://upkfllmtazocitcikdff.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwa2ZsbG10YXpvY2l0Y2lrZGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MDU4NjQsImV4cCI6MjA1MjQ4MTg2NH0.RoYrppuh-Xd_mtEUv86KMIpbhlaxlEKApKLypbkH07Q'
export const supabase = createClient(supabaseUrl, supabaseKey);