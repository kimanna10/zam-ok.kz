"use client";

import * as ManufacturerService from "@/lib/services/manufacturer";
import { Manufacturer } from "@/lib/services/manufacturer";
import { useEffect, useState } from "react";

export default function ManufacturerForm() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [newManufacturer, setNewManufacturer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    const data = await ManufacturerService.fetchManufacturers();
    setManufacturers(data);
  };

  const addManufacturer = async () => {
    if (!newManufacturer) return;
    const data = await ManufacturerService.addManufacturer(newManufacturer);
    if (data) setManufacturers((prev) => [...prev, data]);
    setNewManufacturer("");
  };

  const deleteManufacturer = async (id: number) => {
    const success = await ManufacturerService.deleteManufacturer(id);
    if (success) setManufacturers((prev) => prev.filter((m) => m.id !== id));
  };

  const startEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = async (id: number) => {
    const data = await ManufacturerService.updateManufacturer(id, editingName);
    if (data) {
      setManufacturers((prev) => prev.map((m) => (m.id === id ? data : m)));
      setEditingId(null);
      setEditingName("");
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          value={newManufacturer}
          onChange={(e) => setNewManufacturer(e.target.value)}
          className="border rounded-l px-3 py-2 flex-1"
          placeholder="Новый производитель"
        />
        <button
          onClick={addManufacturer}
          className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/80"
        >
          Добавить
        </button>
      </div>

      <ul className="space-y-2">
        {manufacturers.map((m) => (
          <li
            key={m.id}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            {editingId === m.id ? (
              <input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="border px-2 py-1 flex-1"
              />
            ) : (
              <span>{m.name}</span>
            )}

            <div className="flex gap-2">
              {editingId === m.id ? (
                <button
                  onClick={() => saveEdit(m.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  Сохранить
                </button>
              ) : (
                <button
                  onClick={() => startEdit(m.id, m.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Редактировать
                </button>
              )}
              <button
                onClick={() => deleteManufacturer(m.id)}
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
