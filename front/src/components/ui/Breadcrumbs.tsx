import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    ...items.filter((item) => item.href !== "/"),
  ];

  return (
    <nav className="bg-primary" aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-0.5 sm:gap-3">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-1 sm:gap-3">
            {index < breadcrumbs.length - 1 ? (
              <Link href={item.href} className="py-2 hover:text-grey">
                {item.label}
              </Link>
            ) : (
              <span className="py-2 font-bold">{item.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <LuChevronRight size={18} className="opacity-70" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
