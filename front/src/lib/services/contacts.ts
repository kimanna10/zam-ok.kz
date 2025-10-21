import { supabase } from "@/lib/supabaseClient";

export type Contact = {
  id: number;
  name: string;
  phone: string;
  wpp: string;
};

// Универсальная функция обработки ошибок Supabase
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

export const fetchContacts = async (): Promise<Contact[]> => {
  const data = await handle<Contact[]>(supabase.from("contacts").select("*"));
  return data || [];
};

export const addContact = async (
  name: string,
  phone: string,
  wpp: string
): Promise<Contact | null> => {
  const data = await handle<Contact[]>(
    supabase.from("contacts").insert([{ name, phone, wpp }]).select()
  );
  return data ? data[0] : null;
};

export const updateContact = async (
  id: number,
  name: string,
  phone: string,
  wpp: string
): Promise<Contact | null> => {
  const data = await handle<Contact[]>(
    supabase.from("contacts").update({ name, phone, wpp }).eq("id", id).select()
  );
  return data ? data[0] : null;
};

export const deleteContact = async (id: number): Promise<boolean> => {
  const data = await handle(supabase.from("contacts").delete().eq("id", id));
  return data !== null;
};
