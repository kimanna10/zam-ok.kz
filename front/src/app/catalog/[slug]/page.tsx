import Container from "@/components/layouts/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Image from "next/image";
import { notFound } from "next/navigation";

const products = [
  {
    slug: "vreznoy-zamok-mottura",
    name: "Врезной замок Mottura",
    price: "25 000 ₸",
    image: "/images/catalog/lock1.jpg",
    description:
      "Надёжный врезной замок итальянского качества. Обеспечивает высокий уровень безопасности и долговечность конструкции.",
  },
  {
    slug: "seyf-ofisnyy",
    name: "Сейф офисный",
    price: "45 000 ₸",
    image: "/images/catalog/safe1.jpg",
    description:
      "Компактный сейф для документов и ценностей. Идеально подходит для офиса или квартиры.",
  },
  {
    slug: "ruchka-dvernaya-stalnaya",
    name: "Ручка дверная стальная",
    price: "12 000 ₸",
    image: "/images/catalog/handle1.jpg",
    description:
      "Элегантная и надёжная стальная ручка, устойчивая к износу. Подойдёт для дверей любого типа.",
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

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
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-primary text-xl font-semibold mb-6">
              {product.price}
            </p>
            <p className="text-grey mb-8">{product.description}</p>

            <button className="bg-primary text-white py-3 px-8 rounded-xl hover:bg-primary/80 transition">
              Добавить в корзину
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
