import { supabase } from "../supabaseClient";

export type Category = { id: number; name: string };

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("category").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

export const addCategory = async (name: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from("category")
    .insert([{ name }])
    .select();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? data[0] : null;
};

export const updateCategory = async (
  id: number,
  name: string
): Promise<Category | null> => {
  const { data, error } = await supabase
    .from("category")
    .update({ name })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? data[0] : null;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("category").delete().eq("id", id);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
};
