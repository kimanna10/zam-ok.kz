import { supabase } from "@/lib/supabaseClient";

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

// универсальная функция обработки ошибок Supabase
async function handle<T>(promise: any): Promise<T | null> {
  try {
    const { data, error } = await promise;
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Supabase Error:", err);
    return null;
  }
}

export const fetchFAQs = async (): Promise<FAQ[]> => {
  const data = await handle<FAQ[]>(supabase.from("faq").select("*"));
  return data || [];
};

export const addFAQ = async (
  question: string,
  answer: string
): Promise<FAQ | null> => {
  const data = await handle<FAQ[]>(
    supabase.from("faq").insert([{ question, answer }]).select()
  );
  return data ? data[0] : null;
};

export const updateFAQ = async (
  id: number,
  question: string,
  answer: string
): Promise<FAQ | null> => {
  const data = await handle<FAQ[]>(
    supabase.from("faq").update({ question, answer }).eq("id", id).select()
  );
  return data ? data[0] : null;
};

export const deleteFAQ = async (id: number): Promise<boolean> => {
  const data = await handle(supabase.from("faq").delete().eq("id", id));
  return data !== null;
};
