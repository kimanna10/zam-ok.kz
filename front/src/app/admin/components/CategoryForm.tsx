"use client";

import * as CategoryService from "@/lib/services/category";
import { Category } from "@/lib/services/category";
import { useEffect, useState } from "react";

export default function CategoryForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await CategoryService.fetchCategories();
    setCategories(data);
  };

  const addCategory = async () => {
    if (!newCategory) return;
    const data = await CategoryService.addCategory(newCategory);
    if (data) setCategories((prev) => [...prev, data]);
    setNewCategory("");
  };

  const deleteCategory = async (id: number) => {
    const success = await CategoryService.deleteCategory(id);
    if (success) setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const startEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = async (id: number) => {
    const data = await CategoryService.updateCategory(id, editingName);
    if (data) {
      setCategories((prev) => prev.map((c) => (c.id === id ? data : c)));
      setEditingId(null);
      setEditingName("");
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded-l px-3 py-2 flex-1"
          placeholder="Новая категория"
        />
        <button
          onClick={addCategory}
          className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/80"
        >
          Добавить
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            {editingId === cat.id ? (
              <input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="border px-2 py-1 flex-1"
              />
            ) : (
              <span>{cat.name}</span>
            )}

            <div className="flex gap-2">
              {editingId === cat.id ? (
                <button
                  onClick={() => saveEdit(cat.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  Сохранить
                </button>
              ) : (
                <button
                  onClick={() => startEdit(cat.id, cat.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Редактировать
                </button>
              )}
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
