import { supabase } from "../supabaseClient";

export type CatalogItem = {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
  category_id: number | null;
  subcategory_id: number | null;
  manufacturer_id: number | null;
  created_at?: string;
  category?: { id: number; name: string } | null;
  subcategory?: { id: number; name: string } | null;
  manufacturer?: { id: number; name: string } | null;
};

// ✅ Чтение каталога со связями
export const fetchCatalog = async (): Promise<CatalogItem[]> => {
  const { data, error } = await supabase
    .from("catalog")
    .select(
      `
      id,
      name,
      price,
      desc,
      img,
      category_id,
      subcategory_id,
      manufacturer_id,
      created_at,
      category ( id, name ),
      subcategory ( id, name ),
      manufacturer ( id, name )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка при получении каталога:", error);
    return [];
  }

  // 🧠 Нормализуем вложенные массивы в объекты
  return (data ?? []).map((item: any) => ({
    ...item,
    category: Array.isArray(item.category) ? item.category[0] : item.category,
    subcategory: Array.isArray(item.subcategory)
      ? item.subcategory[0]
      : item.subcategory,
    manufacturer: Array.isArray(item.manufacturer)
      ? item.manufacturer[0]
      : item.manufacturer,
  }));
};

// ✅ Добавление нового товара
export const addCatalogItem = async (
  item: Omit<
    CatalogItem,
    "id" | "created_at" | "category" | "subcategory" | "manufacturer"
  >
): Promise<CatalogItem | null> => {
  const { data, error } = await supabase
    .from("catalog")
    .insert([item])
    .select();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? data[0] : null;
};

// ✅ Обновление
export const updateCatalogItem = async (
  id: number,
  updates: Partial<Omit<CatalogItem, "id">>
): Promise<CatalogItem | null> => {
  const { data, error } = await supabase
    .from("catalog")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? data[0] : null;
};

// ✅ Удаление
export const deleteCatalogItem = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("catalog").delete().eq("id", id);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
};
