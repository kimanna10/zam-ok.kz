import { supabase } from "../supabaseClient";

export type Manufacturer = {
  id: number;
  name: string;
};

export const fetchManufacturers = async (): Promise<Manufacturer[]> => {
  const { data, error } = await supabase.from("manufacturer").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

export const addManufacturer = async (
  name: string
): Promise<Manufacturer | null> => {
  const { data, error } = await supabase
    .from("manufacturer")
    .insert([{ name }])
    .select();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? data[0] : null;
};

export const updateManufacturer = async (
  id: number,
  name: string
): Promise<Manufacturer | null> => {
  const { data, error } = await supabase
    .from("manufacturer")
    .update({ name })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? data[0] : null;
};

export const deleteManufacturer = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("manufacturer").delete().eq("id", id);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
};
