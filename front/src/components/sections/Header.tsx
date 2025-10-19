"use client";

import Container from "@/components/layouts/Container";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const navItems = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: "О нас", href: "/about" },
    { label: "Вопросы", href: "/questions" },
    { label: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="my-6 sticky top-6 z-50">
      <Container>
        <div className="bg-white-primary/30 backdrop-blur-md border border-white-primary/20 rounded-2xl py-4 px-6 flex justify-between items-center relative z-50">
          {/* ЛОГОТИП */}
          <Link href="/" className="block" onClick={closeMenu}>
            <Image
              src="/logo.svg"
              height={100}
              width={100}
              alt="Логотип zam-ok"
              className="h-8 w-auto"
            />
          </Link>

          {/* НАВИГАЦИЯ — десктоп */}
          <nav className="hidden md:flex gap-8   ">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={` hover:text-grey ${
                    isActive ? "font-extrabold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* КНОПКА МЕНЮ — мобильная */}
          <button
            onClick={toggleMenu}
            className="md:hidden hover:text-grey transition-colors cursor-pointer"
            aria-label="Открыть меню"
          >
            {menuOpen ? <LuX size={28} /> : <LuMenu size={28} />}
          </button>
        </div>

        {/* Мобильное меню — во весь экран */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black-primary  flex flex-col items-center justify-center space-y-8 text-lg font-semibold z-40 "
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-grey transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
