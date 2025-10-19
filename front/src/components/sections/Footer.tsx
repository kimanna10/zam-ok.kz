import Container from "@/components/layouts/Container";
import Image from "next/image";
import Link from "next/link";

import { IoCall, IoLocationSharp, IoLogoWhatsapp } from "react-icons/io5";

const catalogNav = [
  { name: "Замки", href: "/" },
  { name: "Сейфы", href: "/" },
  { name: "Сердечники", href: "/" },
  { name: "Доводчики", href: "/" },
  { name: "Домофоны", href: "/" },
  { name: "Ручки", href: "/" },
];

const contacts = [
  { item: "+7 (701) 788 71 85", icon: <IoCall size={20} />, link: "#" },
  {
    item: "Написать в WhatsApp",
    icon: <IoLogoWhatsapp size={20} />,
    link: "#",
  },
  {
    item: "г. Алматы, Казахстан",
    icon: <IoLocationSharp size={20} />,
    link: "#",
  },
];

const nav = [
  { name: "Каталог", href: "/catalog" },
  { name: "О нас", href: "/about" },
  { name: "Вопросы", href: "/questions" },
  { name: "Контакты", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="bg-black-primary">
      <div className="py-20">
        <Container>
          <div className="flex justify-between xl:flex-row flex-col md:gap-20 gap-10">
            <div className="space-y-3.5 max-w-2xs">
              <Link href="/" className="block">
                <Image
                  src="/logo.svg"
                  height={100}
                  width={100}
                  alt="Логотип zamok"
                  className="h-10 w-auto"
                />
              </Link>

              <p className="text-lg leading-snug">
                Надёжная установка и замена замков — быстро и профессионально.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
              <nav className="space-y-4">
                <Link
                  href="/"
                  className="text-xl font-bold hover:text-grey block"
                >
                  Главная
                </Link>
                <ul className="space-y-1">
                  {nav.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="hover:text-grey block py-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav className="space-y-4">
                <Link
                  href="/catalog"
                  className="text-xl font-bold hover:text-grey block"
                >
                  Каталог
                </Link>
                <ul className="space-y-1">
                  {catalogNav.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="hover:text-grey block py-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <address className="space-y-4 not-italic ">
                <Link
                  href="/contacts"
                  className="text-xl font-bold hover:text-grey block"
                >
                  Контакты
                </Link>
                <ul className="space-y-1">
                  {contacts.map((contact, i) => (
                    <li key={i}>
                      <Link
                        href={contact.link}
                        className="hover:text-grey py-1 flex gap-1 items-center"
                      >
                        {contact.icon}
                        {contact.item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </address>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white-primary text-black-primary text-center py-5">
        <p className="text-sm">
          &copy; 2005–{new Date().getFullYear()} zam-ok.kz. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
