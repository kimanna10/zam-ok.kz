"use client";

import * as ContactService from "@/lib/services/contacts";
import { Contact } from "@/lib/services/contacts";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newWpp, setNewWpp] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const [editingWpp, setEditingWpp] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const data = await ContactService.fetchContacts();
    setContacts(data);
  };

  const addContact = async () => {
    if (!newName || !newPhone) return;
    const data = await ContactService.addContact(newName, newPhone, newWpp);
    if (data) setContacts((prev) => [...prev, data]);
    setNewName("");
    setNewPhone("");
    setNewWpp("");
  };

  const deleteContact = async (id: number) => {
    const success = await ContactService.deleteContact(id);
    if (success) setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setEditingName(contact.name);
    setEditingPhone(contact.phone);
    setEditingWpp(contact.wpp);
  };

  const saveEdit = async (id: number) => {
    const data = await ContactService.updateContact(
      id,
      editingName,
      editingPhone,
      editingWpp
    );
    if (data) {
      setContacts((prev) => prev.map((c) => (c.id === id ? data : c)));
      setEditingId(null);
      setEditingName("");
      setEditingPhone("");
      setEditingWpp("");
    }
  };

  return (
    <div>
      {/* Добавление нового контакта */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Имя"
        />
        <input
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Телефон"
        />
        <input
          value={newWpp}
          onChange={(e) => setNewWpp(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="WhatsApp"
        />
        <button
          onClick={addContact}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          Добавить контакт
        </button>
      </div>

      {/* Список контактов */}
      <ul className="space-y-2">
        {contacts.map((c) => (
          <li
            key={c.id}
            className="border rounded px-3 py-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
          >
            {editingId === c.id ? (
              <>
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border px-2 py-1 flex-1"
                />
                <input
                  value={editingPhone}
                  onChange={(e) => setEditingPhone(e.target.value)}
                  className="border px-2 py-1 flex-1"
                />
                <input
                  value={editingWpp}
                  onChange={(e) => setEditingWpp(e.target.value)}
                  className="border px-2 py-1 flex-1"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(c.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Сохранить
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>Имя:</strong> {c.name} <br />
                  <strong>Телефон:</strong> {c.phone} <br />
                  <strong>WhatsApp:</strong> {c.wpp}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
