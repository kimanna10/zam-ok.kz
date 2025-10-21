import { supabase } from "@/lib/supabaseClient";

export type Subcategory = {
  id: number;
  name: string;
  category_id: number;
};

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

export const fetchSubcategory = async (): Promise<Subcategory[]> => {
  const data = await handle<Subcategory[]>(
    supabase.from("subcategory").select("*")
  );
  return data || [];
};

export const fetchSubcategoryByCategory = async (
  categoryId: number
): Promise<Subcategory[]> => {
  const data = await handle<Subcategory[]>(
    supabase.from("subcategory").select("*").eq("category_id", categoryId)
  );
  return data || [];
};

export const addSubcategory = async (
  name: string,
  category_id: number
): Promise<Subcategory | null> => {
  const data = await handle<Subcategory[]>(
    supabase.from("subcategory").insert([{ name, category_id }]).select()
  );
  return data ? data[0] : null;
};

export const updateSubcategory = async (
  id: number,
  name: string,
  category_id: number
): Promise<Subcategory | null> => {
  const data = await handle<Subcategory[]>(
    supabase
      .from("subcategory")
      .update({ name, category_id })
      .eq("id", id)
      .select()
  );
  return data ? data[0] : null;
};

export const deleteSubcategory = async (id: number): Promise<boolean> => {
  const data = await handle(supabase.from("subcategory").delete().eq("id", id));
  return data !== null;
};

export const fetchSubcategoriesByCategory = async (
  categoryId: number
): Promise<Subcategory[]> => {
  const { data, error } = await supabase
    .from("subcategory")
    .select("*")
    .eq("category_id", categoryId);
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
