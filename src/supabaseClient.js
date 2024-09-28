import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejadxmzngmhlryohujcg.supabase.co/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqYWR4bXpuZ21obHJ5b2h1amNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MTg5MjcsImV4cCI6MjA0MjE5NDkyN30.HgUawR27M0zzRekNWOMlNfRzJUQQWITcHs4ZHMnoH4w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sugestão: Adicione uma função para verificar a conexão com o Supabase
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("your_table")
      .select("count", { count: "exact" });
    if (error) throw error;
    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    console.error("Supabase connection failed:", error.message);
    return false;
  }
};
