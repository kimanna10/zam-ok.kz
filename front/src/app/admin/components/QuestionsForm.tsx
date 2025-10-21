"use client";

import * as FAQService from "@/lib/services/faq";
import { FAQ } from "@/lib/services/faq";
import { useEffect, useState } from "react";

export default function QuestionsForm() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState("");
  const [editingAnswer, setEditingAnswer] = useState("");

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const data = await FAQService.fetchFAQs();
    setFaqs(data);
  };

  const addFAQ = async () => {
    if (!newQuestion || !newAnswer) return;
    const data = await FAQService.addFAQ(newQuestion, newAnswer);
    if (data) setFaqs((prev) => [...prev, data]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const deleteFAQ = async (id: number) => {
    const success = await FAQService.deleteFAQ(id);
    if (success) setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditingQuestion(faq.question);
    setEditingAnswer(faq.answer);
  };

  const saveEdit = async (id: number) => {
    const data = await FAQService.updateFAQ(id, editingQuestion, editingAnswer);
    if (data) {
      setFaqs((prev) => prev.map((f) => (f.id === id ? data : f)));
      setEditingId(null);
      setEditingQuestion("");
      setEditingAnswer("");
    }
  };

  return (
    <div>
      {/* Добавление нового вопроса */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Вопрос"
        />
        <input
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Ответ"
        />
        <button
          onClick={addFAQ}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          Добавить FAQ
        </button>
      </div>

      {/* Список FAQ */}
      <ul className="space-y-2">
        {faqs.map((faq) => (
          <li
            key={faq.id}
            className="border rounded px-3 py-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
          >
            {editingId === faq.id ? (
              <>
                <input
                  value={editingQuestion}
                  onChange={(e) => setEditingQuestion(e.target.value)}
                  className="border px-2 py-1 flex-1"
                />
                <input
                  value={editingAnswer}
                  onChange={(e) => setEditingAnswer(e.target.value)}
                  className="border px-2 py-1 flex-1"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(faq.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Сохранить
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>Q:</strong> {faq.question} <br />
                  <strong>A:</strong> {faq.answer}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(faq)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => deleteFAQ(faq.id)}
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
