// "use client";

// import Container from "@/components/layouts/Container";
// import Breadcrumbs from "@/components/ui/Breadcrumbs";
// import Title from "@/components/ui/Title";
// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { LuChevronDown, LuChevronRight } from "react-icons/lu";

// const breadcrumbs = [
//   { label: "Главная", href: "/" },
//   { label: "Каталог", href: `/catalog` },
// ];

// const categories = [
//   {
//     name: "Замки",
//     subcategories: ["Врезные", "Накладные", "Электронные", "Навесные"],
//   },
//   {
//     name: "Сейфы",
//     subcategories: ["Домашние", "Офисные", "Встраиваемые"],
//   },
//   {
//     name: "Сердечники",
//     subcategories: ["Цилиндровые", "Сувальдные"],
//   },
//   {
//     name: "Доводчики",
//     subcategories: ["Для входных дверей", "Для межкомнатных"],
//   },
//   {
//     name: "Домофоны",
//     subcategories: ["Аудио", "Видео", "Беспроводные"],
//   },
//   {
//     name: "Ручки",
//     subcategories: ["Межкомнатные", "Входные", "Декоративные"],
//   },
// ];

// const products = [
//   {
//     slug: "vreznoy-zamok-mottura",
//     name: "Врезной замок Mottura",
//     price: "25 000 ₸",
//     image: "/images/catalog/lock1.jpg",
//     category: "Замки",
//     subcategory: "Врезные",
//   },
//   {
//     slug: "seyf-ofisnyy",
//     name: "Сейф офисный",
//     price: "45 000 ₸",
//     image: "/images/catalog/safe1.jpg",
//     category: "Сейфы",
//     subcategory: "Офисные",
//   },
//   {
//     slug: "ruchka-dvernaya-stalnaya",
//     name: "Ручка дверная стальная",
//     price: "12 000 ₸",
//     image: "/images/catalog/handle1.jpg",
//     category: "Ручки",
//     subcategory: "Входные",
//   },
// ];

// export default function Catalog() {
//   const [activeCategory, setActiveCategory] = useState<string | null>("Замки");

//   const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
//     null
//   );
//   return (
//     <section className="pb-20">
//       <Container>
//         <Breadcrumbs items={breadcrumbs} />

//         <div className="py-20">
//           <Title size="lg">Каталог</Title>

//           <div className="mt-10 grid md:grid-cols-[280px_1fr] gap-10">
//             {/* Меню категорий */}
//             <aside>
//               <ul className="space-y-2">
//                 {categories.map((cat) => {
//                   const isActive = activeCategory === cat.name;

//                   return (
//                     <li key={cat.name}>
//                       <button
//                         onClick={() => {
//                           setActiveCategory(cat.name);
//                           setActiveSubcategory(null); // сбрасываем подкатегорию
//                         }}
//                         className={`flex justify-between items-center w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
//                           isActive
//                             ? "text-primary bg-white/10"
//                             : "hover:text-primary hover:bg-white/5"
//                         }`}
//                       >
//                         <span>{cat.name}</span>
//                         {isActive ? (
//                           <LuChevronDown className="text-primary" />
//                         ) : (
//                           <LuChevronRight />
//                         )}
//                       </button>

//                       {/* Подкатегории */}
//                       <AnimatePresence initial={false}>
//                         {isActive && (
//                           <motion.ul
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="ml-4 mt-2 space-y-1 overflow-hidden text-sm text-grey"
//                           >
//                             {/* 🔹 Пункт "Все" */}
//                             <li
//                               onClick={() => setActiveSubcategory(null)}
//                               className={`px-4 py-1.5 rounded-lg cursor-pointer transition ${
//                                 activeSubcategory === null
//                                   ? "text-primary bg-white/10"
//                                   : "hover:text-primary hover:bg-white/5"
//                               }`}
//                             >
//                               Все
//                             </li>

//                             {/* 🔹 Остальные подкатегории */}
//                             {cat.subcategories.map((sub) => (
//                               <li
//                                 key={sub}
//                                 onClick={() => setActiveSubcategory(sub)}
//                                 className={`px-4 py-1.5 rounded-lg cursor-pointer transition ${
//                                   activeSubcategory === sub
//                                     ? "text-primary bg-white/10"
//                                     : "hover:text-primary hover:bg-white/5"
//                                 }`}
//                               >
//                                 {sub}
//                               </li>
//                             ))}
//                           </motion.ul>
//                         )}
//                       </AnimatePresence>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </aside>

//             {/* Список товаров */}

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products
//                 .filter(
//                   (p) =>
//                     (!activeCategory || p.category === activeCategory) &&
//                     (!activeSubcategory || p.subcategory === activeSubcategory)
//                 )
//                 .map((product, i) => (
//                   <Link href={`/catalog/${product.slug}`} key={product.slug}>
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.4, delay: i * 0.1 }}
//                       className="bg-white-primary/10 rounded-2xl p-4 hover:bg-transparent transition backdrop-blur-md cursor-pointer"
//                     >
//                       <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
//                         <Image
//                           src={product.image}
//                           alt={product.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <h3 className="text-lg font-semibold mb-1">
//                         {product.name}
//                       </h3>
//                       <p className="text-primary font-bold">{product.price}</p>
//                     </motion.div>
//                   </Link>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

"use client";

import Container from "@/components/layouts/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Title from "@/components/ui/Title";
import { fetchCatalog, type CatalogItem } from "@/lib/services/catalog"; // ✅ импорт твоей функции из catalog.ts
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

const breadcrumbs = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: `/catalog` },
];

export default function Catalog() {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [categories, setCategories] = useState<
    { name: string; subcategories: string[] }[]
  >([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null
  );

  // ✅ Загружаем товары при загрузке страницы
  useEffect(() => {
    const load = async () => {
      const data = await fetchCatalog();
      setCatalog(data);

      // 🧩 Формируем уникальные категории и подкатегории на основе полученных данных
      const grouped = data.reduce((acc, item) => {
        if (!item.category?.name) return acc;
        const cat = acc.find((c) => c.name === item.category!.name);
        if (cat) {
          if (
            item.subcategory?.name &&
            !cat.subcategories.includes(item.subcategory.name)
          ) {
            cat.subcategories.push(item.subcategory.name);
          }
        } else {
          acc.push({
            name: item.category!.name,
            subcategories: item.subcategory?.name
              ? [item.subcategory.name]
              : [],
          });
        }
        return acc;
      }, [] as { name: string; subcategories: string[] }[]);

      setCategories(grouped);

      // ставим активной первую категорию по умолчанию
      if (grouped.length > 0) setActiveCategory(grouped[0].name);
    };

    load();
  }, []);

  // ✅ Фильтрация по активной категории и подкатегории
  const filtered = catalog.filter(
    (p) =>
      (!activeCategory || p.category?.name === activeCategory) &&
      (!activeSubcategory || p.subcategory?.name === activeSubcategory)
  );

  return (
    <section className="pb-20">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="py-20">
          <Title size="lg">Каталог</Title>

          <div className="mt-10 grid md:grid-cols-[280px_1fr] gap-10">
            {/* Меню категорий */}
            <aside>
              <ul className="space-y-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.name;

                  return (
                    <li key={cat.name}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.name);
                          setActiveSubcategory(null);
                        }}
                        className={`flex justify-between items-center w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                          isActive
                            ? "text-primary bg-white/10"
                            : "hover:text-primary hover:bg-white/5"
                        }`}
                      >
                        <span>{cat.name}</span>
                        {isActive ? (
                          <LuChevronDown className="text-primary" />
                        ) : (
                          <LuChevronRight />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-1 overflow-hidden text-sm text-grey"
                          >
                            <li
                              onClick={() => setActiveSubcategory(null)}
                              className={`px-4 py-1.5 rounded-lg cursor-pointer transition ${
                                activeSubcategory === null
                                  ? "text-primary bg-white/10"
                                  : "hover:text-primary hover:bg-white/5"
                              }`}
                            >
                              Все
                            </li>

                            {cat.subcategories.map((sub) => (
                              <li
                                key={sub}
                                onClick={() => setActiveSubcategory(sub)}
                                className={`px-4 py-1.5 rounded-lg cursor-pointer transition ${
                                  activeSubcategory === sub
                                    ? "text-primary bg-white/10"
                                    : "hover:text-primary hover:bg-white/5"
                                }`}
                              >
                                {sub}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Список товаров */}
            {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <Link href={`/catalog/${product.slug}`} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white-primary/10 rounded-2xl p-4 hover:bg-transparent transition backdrop-blur-md cursor-pointer"
                  >
                    <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                      <img
                        src={product.img || "/images/no-image.jpg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold">
                      от {product.price?.toLocaleString("ru-RU")} ₸
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div> */}
            {/* Список товаров */}
            <div className="grid grid-cols-1  gap-6">
              {filtered.map((product, i) => (
                <Link href={`/catalog/${product.slug}`} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex md:items-center md:flex-row flex-col gap-4 bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition backdrop-blur-md cursor-pointer"
                  >
                    {/* Картинка слева */}
                    <div className="relative md:w-40 w-full h-56 md:h-40 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={product.img || "/images/no-image.jpg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Контент справа */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {product.name}
                        </h3>
                        {product.desc && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {product.desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <p className="text-primary font-bold text-lg">
                          от {product.price?.toLocaleString("ru-RU")} ₸
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
