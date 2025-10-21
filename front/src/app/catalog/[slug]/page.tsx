import Container from "@/components/layouts/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { notFound } from "next/navigation";

import { fetchCatalog } from "@/lib/services/catalog";

// const products = [
//   {
//     slug: "vreznoy-zamok-mottura",
//     name: "Врезной замок Mottura",
//     price: "25 000 ₸",
//     image: "/images/catalog/lock1.jpg",
//     description:
//       "Надёжный врезной замок итальянского качества. Обеспечивает высокий уровень безопасности и долговечность конструкции.",
//   },
//   {
//     slug: "seyf-ofisnyy",
//     name: "Сейф офисный",
//     price: "45 000 ₸",
//     image: "/images/catalog/safe1.jpg",
//     description:
//       "Компактный сейф для документов и ценностей. Идеально подходит для офиса или квартиры.",
//   },
//   {
//     slug: "ruchka-dvernaya-stalnaya",
//     name: "Ручка дверная стальная",
//     price: "12 000 ₸",
//     image: "/images/catalog/handle1.jpg",
//     description:
//       "Элегантная и надёжная стальная ручка, устойчивая к износу. Подойдёт для дверей любого типа.",
//   },
// ];

export async function generateStaticParams() {
  // ✅ Получаем список товаров из БД
  const catalog = await fetchCatalog();

  // Возвращаем массив slug'ов для SSG (Next.js)
  return catalog.map((item) => ({ slug: item.slug }));

  // return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ✅ Загружаем все товары и ищем нужный по slug
  const catalog = await fetchCatalog();
  const product = catalog.find((p) => p.slug === slug);
  // const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: product.name, href: `/catalog/${product.slug}` },
  ];

  return (
    <section>
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-auto rounded-xl overflow-hidden">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-primary text-xl font-semibold">
              от {product.price?.toLocaleString("ru-RU")} ₸
            </p>
            <p className="text-grey">{product.desc}</p>
            <div className="text-sm text-white-primary mt-3 space-y-1">
              {product.category?.name && (
                <p>
                  <span className="font-medium text-grey">Категория: </span>
                  {product.category.name}
                </p>
              )}
              {product.subcategory?.name && (
                <p>
                  <span className="font-medium text-grey">Подкатегория: </span>
                  {product.subcategory.name}
                </p>
              )}
              {product.manufacturer?.name && (
                <p>
                  <span className="font-medium text-grey">Производитель: </span>
                  {product.manufacturer.name}
                </p>
              )}
            </div>

            <button className="bg-white-primary text-black-primary py-2 px-6 rounded-xl hover:bg-primary/80 transition cursor-pointer">
              Заказать
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
