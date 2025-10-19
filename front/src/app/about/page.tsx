"use client";

import Container from "@/components/layouts/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Counter from "@/components/ui/Counter";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { LuKeyRound, LuShieldCheck, LuWrench } from "react-icons/lu";

const breadcrumbs = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: `/about` },
];
const items = [
  {
    icon: (
      <LuShieldCheck className="w-10 h-10 mx-auto mb-4 text-blue-primary" />
    ),
    title: "Надёжность",
    text: "Мы предлагаем только сертифицированные замки и механизмы, проверенные временем и ведущими производителями.",
  },
  {
    icon: <LuWrench className="w-10 h-10 mx-auto mb-4 text-blue-primary" />,
    title: "Профессионализм",
    text: "Наши специалисты выполняют установку и замену замков аккуратно, быстро и с гарантией качества.",
  },
  {
    icon: <LuKeyRound className="w-10 h-10 mx-auto mb-4 text-blue-primary" />,
    title: "Безопасность",
    text: "Главная цель нашей компании — обеспечить вашим дверям и помещениям высокий уровень защиты и спокойствие.",
  },
];

export default function About() {
  return (
    <section>
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-20 space-y-20">
          {/* Заголовок */}
          <Title size="lg">О нас</Title>

          {/* Описание */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 mt-10"
          >
            <p className=" text-grey">
              Дверные замки{" "}
              <span className="text-white-primary font-bold">
                высшего качества.
              </span>{" "}
              Мы занимаемся установкой, заменой и врезкой замков, обеспечивая
              надёжную защиту вашего дома и офиса. За годы работы мы накопили
              большой опыт и знаем, как подобрать идеальный замок под любые
              требования. Наш специалист поможет выбрать оптимальную модель и
              проконсультирует по современным решениям для дверей и сейфов. Наши
              замки отличаются прочностью, надёжностью и устойчивостью к взлому.
              Мы работаем только с проверенными брендами —{" "}
              <span className="text-white-primary font-bold">
                Mottura, Cisa, Kale и другими ведущими производителями,
              </span>{" "}
              для которых безопасность и качество — приоритет. Доверьте
              установку замков{" "}
              <span className="text-white-primary font-bold">
                настоящим профессионалам
              </span>{" "}
              — и будьте уверены в своей защите.
            </p>
          </motion.div>

          {/* Секция статистики */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-10"
          >
            <Counter value={20} label="Лет на рынке" />
            <Counter value={1200} label="Установленных замков" />
            <Counter value={300} label="Довольных клиентов" />
            <Counter value={25} label="Партнёров и брендов" />
          </motion.div>

          {/* Блок преимуществ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid md:grid-cols-3 gap-10 text-center"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md "
              >
                {item.icon}
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-grey">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
