import { supabase } from "./supabaseClient";

// Получить категории с подкатегориями
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, subcategories(id, name)");
  if (error) throw error;
  return data;
}

// Получить товары (опционально по подкатегории)
export async function getProducts(subcategoryId?: string) {
  let query = supabase.from("products").select("*");
  if (subcategoryId) {
    query = query.eq("subcategory_id", subcategoryId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
