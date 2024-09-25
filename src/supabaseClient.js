import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejadxmzngmhlryohujcg.supabase.co/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqYWR4bXpuZ21obHJ5b2h1amNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MTg5MjcsImV4cCI6MjA0MjE5NDkyN30.HgUawR27M0zzRekNWOMlNfRzJUQQWITcHs4ZHMnoH4w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
