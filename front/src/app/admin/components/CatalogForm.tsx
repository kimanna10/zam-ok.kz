"use client";

import * as CatalogService from "@/lib/services/catalog";
import { CatalogItem } from "@/lib/services/catalog";
import * as CategoryService from "@/lib/services/category";
import { Category } from "@/lib/services/category";
import * as ManufacturerService from "@/lib/services/manufacturer";
import { Manufacturer } from "@/lib/services/manufacturer";
import * as SubcategoryService from "@/lib/services/subcategory";
import { Subcategory } from "@/lib/services/subcategory";
import { useEffect, useState } from "react";

export default function CatalogAdmin() {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
    slug: "",
    category_id: "",
    subcategory_id: "",
    manufacturer_id: "",
  });

  const [editItem, setEditItem] = useState<CatalogItem | null>(null);
  const [editSubcategories, setEditSubcategories] = useState<Subcategory[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [catData, manufData, catalogData] = await Promise.all([
      CategoryService.fetchCategories(),
      ManufacturerService.fetchManufacturers(),
      CatalogService.fetchCatalog(),
    ]);
    setCategories(catData);
    setManufacturers(manufData);
    setCatalog(catalogData);
  };

  const handleCategoryChange = async (categoryId: string) => {
    setNewItem({ ...newItem, category_id: categoryId, subcategory_id: "" });
    if (categoryId) {
      const subData = await SubcategoryService.fetchSubcategoriesByCategory(
        Number(categoryId)
      );
      setSubcategories(subData);
    } else {
      setSubcategories([]);
    }
  };

  const addItem = async () => {
    const {
      name,
      price,
      desc,
      img,
      slug,
      category_id,
      subcategory_id,
      manufacturer_id,
    } = newItem;
    if (!name || !price) return;

    const data = await CatalogService.addCatalogItem({
      name,
      price: Number(price),
      desc,
      img,
      slug,
      category_id: category_id ? Number(category_id) : null,
      subcategory_id: subcategory_id ? Number(subcategory_id) : null,
      manufacturer_id: manufacturer_id ? Number(manufacturer_id) : null,
    });

    if (data) setCatalog((prev) => [...prev, data]);

    setNewItem({
      name: "",
      price: "",
      desc: "",
      img: "",
      slug: "",
      category_id: "",
      subcategory_id: "",
      manufacturer_id: "",
    });
  };

  const confirmDelete = (id: number) => {
    setDeleteConfirmId(id);
  };

  const deleteItem = async () => {
    if (!deleteConfirmId) return;
    const success = await CatalogService.deleteCatalogItem(deleteConfirmId);
    if (success)
      setCatalog((prev) => prev.filter((i) => i.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const handleEditCategoryChange = async (categoryId: number) => {
    if (!editItem) return;
    setEditItem({ ...editItem, category_id: categoryId, subcategory_id: null });
    if (categoryId) {
      const subData = await SubcategoryService.fetchSubcategoriesByCategory(
        categoryId
      );
      setEditSubcategories(subData);
    } else {
      setEditSubcategories([]);
    }
  };

  const handleEditSave = async () => {
    if (!editItem) return;
    const updated = await CatalogService.updateCatalogItem(
      editItem.id,
      editItem
    );
    if (updated) {
      setCatalog((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );
      setEditItem(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Каталог товаров</h2>

      {/* --- Добавление --- */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input
          placeholder="Название"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border px-2 py-1"
        />
        <input
          placeholder="Цена"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border px-2 py-1"
        />
        <input
          placeholder="Описание"
          value={newItem.desc}
          onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
          className="border px-2 py-1 col-span-2"
        />
        <input
          placeholder="URL изображения"
          value={newItem.img}
          onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
          className="border px-2 py-1 col-span-2"
        />
        <input
          placeholder="Уникальный адрес"
          value={newItem.slug}
          onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })}
          className="border px-2 py-1 col-span-2"
        />

        {/* Категория */}
        <select
          value={newItem.category_id}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="">Выберите категорию</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Подкатегория */}
        <select
          value={newItem.subcategory_id}
          onChange={(e) =>
            setNewItem({ ...newItem, subcategory_id: e.target.value })
          }
          className="border px-2 py-1"
          disabled={!subcategories.length}
        >
          <option value="">Выберите подкатегорию</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Производитель */}
        <select
          value={newItem.manufacturer_id}
          onChange={(e) =>
            setNewItem({ ...newItem, manufacturer_id: e.target.value })
          }
          className="border px-2 py-1 col-span-2"
        >
          <option value="">Выберите производителя</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={addItem}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 mb-4"
      >
        Добавить товар
      </button>

      {/* --- Каталог --- */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catalog.map((item) => (
          <li
            key={item.id}
            className="border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all bg-white"
          >
            {item.img ? (
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                Нет изображения
              </div>
            )}

            <div className="p-4 flex flex-col justify-between">
              <div className="flex-1 text-black-primary ">
                <h3 className="font-semibold text-lg ">{item.name}</h3>
                <p className=" text-sm mt-1">{item.desc}</p>
                <p className=" font-medium mt-2">{item.price} ₸</p>
                {/* Информация о связях */}
                <div className="text-sm text-gray-500 mt-3 space-y-1">
                  {item.category?.name && (
                    <p>
                      <span className="font-medium text-gray-700">
                        Категория:{" "}
                      </span>
                      {item.category.name}
                    </p>
                  )}
                  {item.subcategory?.name && (
                    <p>
                      <span className="font-medium text-gray-700">
                        Подкатегория:{" "}
                      </span>
                      {item.subcategory.name}
                    </p>
                  )}
                  {item.manufacturer?.name && (
                    <p>
                      <span className="font-medium text-gray-700">
                        Производитель:{" "}
                      </span>
                      {item.manufacturer.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditItem(item);
                    if (item.category_id)
                      SubcategoryService.fetchSubcategoriesByCategory(
                        item.category_id
                      ).then(setEditSubcategories);
                  }}
                  className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => confirmDelete(item.id)}
                  className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* --- Модалка редактирования --- */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black-primary">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Редактировать товар</h3>
            <input
              className="border px-2 py-1 w-full mb-2"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
              placeholder="Название"
            />
            <input
              className="border px-2 py-1 w-full mb-2"
              type="number"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({ ...editItem, price: Number(e.target.value) })
              }
              placeholder="Цена"
            />
            <input
              className="border px-2 py-1 w-full mb-2"
              value={editItem.desc || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, desc: e.target.value })
              }
              placeholder="Описание"
            />
            <input
              className="border px-2 py-1 w-full mb-2"
              value={editItem.img || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, img: e.target.value })
              }
              placeholder="URL изображения"
            />
            <input
              className="border px-2 py-1 w-full mb-2"
              value={editItem.slug || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, slug: e.target.value })
              }
              placeholder="Уникальный адрес"
            />

            {/* Категории */}
            <select
              className="border px-2 py-1 w-full mb-2"
              value={editItem.category_id || ""}
              onChange={(e) => handleEditCategoryChange(Number(e.target.value))}
            >
              <option value="">Выберите категорию</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Подкатегории */}
            <select
              className="border px-2 py-1 w-full mb-2"
              value={editItem.subcategory_id || ""}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  subcategory_id: Number(e.target.value),
                })
              }
              disabled={!editSubcategories.length}
            >
              <option value="">Выберите подкатегорию</option>
              {editSubcategories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Производители */}
            <select
              className="border px-2 py-1 w-full mb-4"
              value={editItem.manufacturer_id || ""}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  manufacturer_id: Number(e.target.value),
                })
              }
            >
              <option value="">Выберите производителя</option>
              {manufacturers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditItem(null)}
                className="px-3 py-1.5 bg-gray-200 rounded hover:bg-gray-300"
              >
                Отмена
              </button>
              <button
                onClick={handleEditSave}
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Модалка подтверждения удаления --- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4 text-black-primary">
              Удалить товар?
            </h3>
            <p className="text-gray-600 mb-6">Это действие нельзя отменить.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black-primary"
              >
                Отмена
              </button>
              <button
                onClick={deleteItem}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
