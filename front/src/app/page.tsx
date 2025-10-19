"use client";

import Container from "@/components/layouts/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuPhoneCall, LuShieldCheck, LuWrench } from "react-icons/lu";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// 🏠 Главная страница
export default function Home() {
  return (
    <main>
      {/* 🧭 Hero Slider */}
      <section className="relative h-[80vh]">
        <Swiper className="h-full">
          {[
            {
              image: "/images/hero/lock.jpg",
              title: "Надёжные замки для вашего дома",
              text: "Замки и системы безопасности от ведущих производителей.",
            },
            {
              image: "/images/hero/safe.jpg",
              title: "Сейфы и защита ценностей",
              text: "Подберите идеальный сейф под ваш дом или офис.",
            },
            {
              image: "/images/hero/door.jpg",
              title: "Профессиональная установка",
              text: "Монтаж, замена и врезка замков с гарантией качества.",
            },
          ].map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover brightness-[0.5]"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl max-w-2xl mb-6"
                  >
                    {slide.text}
                  </motion.p>
                  <Link
                    href="/catalog"
                    className="bg-primary text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-primary/80 transition"
                  >
                    Смотреть каталог
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔐 Категории */}
      <section className="py-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-10"
          >
            Категории товаров
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Замки", image: "/images/categories/locks.jpg" },
              { name: "Сейфы", image: "/images/categories/safe.jpg" },
              { name: "Сердечники", image: "/images/categories/core.jpg" },
              { name: "Доводчики", image: "/images/categories/closer.jpg" },
              { name: "Домофоны", image: "/images/categories/intercom.jpg" },
              { name: "Ручки", image: "/images/categories/handle.jpg" },
            ].map((cat, i) => (
              <Link href={`/catalog?category=${cat.name}`} key={i}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center bg-white/10 backdrop-blur-md">
                    <p className="font-semibold">{cat.name}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 💎 Популярные товары */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10">
            Популярные товары
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Врезной замок Mottura",
                price: "25 000 ₸",
                image: "/images/catalog/lock1.jpg",
              },
              {
                name: "Сейф офисный",
                price: "45 000 ₸",
                image: "/images/catalog/safe1.jpg",
              },
              {
                name: "Ручка дверная стальная",
                price: "12 000 ₸",
                image: "/images/catalog/handle1.jpg",
              },
            ].map((prod, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden p-4 cursor-pointer transition"
              >
                <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>
                <p className="text-primary font-bold">{prod.price}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 🧰 Преимущества */}
      <section className="py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: <LuShieldCheck size={40} />,
                title: "Надёжность",
                text: "Мы предлагаем только проверенные и сертифицированные замки.",
              },
              {
                icon: <LuWrench size={40} />,
                title: "Профессионализм",
                text: "Установка и обслуживание выполняются опытными мастерами.",
              },
              {
                icon: <LuPhoneCall size={40} />,
                title: "Поддержка",
                text: "Консультации и помощь в подборе замков и аксессуаров.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <div className="flex justify-center mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-grey">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 🧑‍🔧 О компании */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">О компании</h2>
              <p className="text-grey mb-6">
                Мы занимаемся продажей, установкой и обслуживанием дверных
                замков и систем безопасности более 10 лет. Наши специалисты
                подберут оптимальное решение под любые задачи — от квартирных
                дверей до промышленных объектов.
              </p>
              <ul className="space-y-2 text-grey">
                <li>🔒 Более 500 установленных замков</li>
                <li>🏠 Работаем по всему Алматы и области</li>
                <li>⚙️ Гарантия на все виды работ</li>
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/about/work.jpg"
                alt="Наша работа"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 📞 CTA */}
      <section className="py-20 text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-4">
            Нужна консультация или подбор замка?
          </h2>
          <p className="text-grey mb-8">
            Наш специалист свяжется с вами и поможет выбрать оптимальный
            вариант.
          </p>
          <Link
            href="/contacts"
            className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/80 transition"
          >
            Связаться с нами
          </Link>
        </Container>
      </section>
    </main>
  );
}
