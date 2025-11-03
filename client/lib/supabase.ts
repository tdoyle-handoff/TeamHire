import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cyqfwfkhbwthmfhhfpyz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5cWZ3ZmtoYnd0aG1maGhmcHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMDY4ODUsImV4cCI6MjA3MDc4Mjg4NX0.G2PZlh3DObsSmESQcZQOPnKRN2KQFRH6oG3NyFx5G68";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
