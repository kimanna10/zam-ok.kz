"use client";

import * as CategoryService from "@/lib/services/category";
import * as SubcategoryService from "@/lib/services/subcategory";
import { useEffect, useState } from "react";

export default function SubcategoryForm() {
  const [subcategories, setSubcategories] = useState<
    SubcategoryService.Subcategory[]
  >([]);
  const [categories, setCategories] = useState<CategoryService.Category[]>([]);
  const [newName, setNewName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState<number | "">("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | "">("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [subs, cats] = await Promise.all([
      SubcategoryService.fetchSubcategory(),
      CategoryService.fetchCategories(),
    ]);
    setSubcategories(subs);
    setCategories(cats);
  };

  const addSubcategory = async () => {
    if (!newName || !newCategoryId) return;
    const data = await SubcategoryService.addSubcategory(
      newName,
      Number(newCategoryId)
    );
    if (data) setSubcategories((prev) => [...prev, data]);
    setNewName("");
    setNewCategoryId("");
  };

  const deleteSubcategory = async (id: number) => {
    const success = await SubcategoryService.deleteSubcategory(id);
    if (success) setSubcategories((prev) => prev.filter((s) => s.id !== id));
  };

  const startEdit = (sub: SubcategoryService.Subcategory) => {
    setEditingId(sub.id);
    setEditingName(sub.name);
    setEditingCategoryId(sub.category_id);
  };

  const saveEdit = async (id: number) => {
    const data = await SubcategoryService.updateSubcategory(
      id,
      editingName,
      Number(editingCategoryId)
    );
    if (data) {
      setSubcategories((prev) => prev.map((s) => (s.id === id ? data : s)));
      setEditingId(null);
      setEditingName("");
      setEditingCategoryId("");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        <select
          value={newCategoryId}
          onChange={(e) => setNewCategoryId(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Название подкатегории"
        />

        <button
          onClick={addSubcategory}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          Добавить подкатегорию
        </button>
      </div>

      <ul className="space-y-2">
        {subcategories.map((s) => {
          const categoryName =
            categories.find((c) => c.id === s.category_id)?.name || "—";
          return (
            <li
              key={s.id}
              className="border rounded px-3 py-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
            >
              {editingId === s.id ? (
                <>
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border px-2 py-1 flex-1"
                  />
                  <select
                    value={editingCategoryId}
                    onChange={(e) =>
                      setEditingCategoryId(Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 flex-1"
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(s.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Сохранить
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>Категория:</strong> {categoryName}
                    <br />
                    <strong>Субкатегория:</strong> {s.name}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(s)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => deleteSubcategory(s.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
