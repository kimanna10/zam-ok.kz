"use client";

import Container from "@/components/layouts/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Title from "@/components/ui/Title";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const breadcrumbs = [
  { label: "Главная", href: "/" },
  { label: "Вопросы", href: `/questions` },
];

// Пример вопросов
const faq = [
  {
    question: "Как сделать заказ?",
    answer:
      "Вы можете оформить заказ прямо на сайте или связаться с нами по телефону. После подтверждения мы подготовим ваш заказ к отправке.",
  },
  {
    question: "Есть ли доставка по Казахстану?",
    answer:
      "Да, мы доставляем по всему Казахстану. Также возможна самовывоз из г. Алматы.",
  },
  {
    question: "Можно ли оплатить при получении?",
    answer:
      "Да, возможна оплата при получении или переводом на карту после подтверждения заказа.",
  },
];

export default function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-20">
          <Title size="lg">Вопросы</Title>

          <div className="mt-10 space-y-4">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* Заголовок вопроса */}
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full flex justify-between items-center p-5 text-left text-white hover:text-primary transition-colors"
                  >
                    <span className="font-medium text-base sm:text-lg">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LuChevronDown size={24} />
                    </motion.div>
                  </button>

                  {/* Ответ */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-gray-300 text-sm sm:text-base leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
