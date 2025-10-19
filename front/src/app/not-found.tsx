import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center  px-4">
      <div className="relative">
        <h1 className="text-8xl sm:text-9xl font-extrabold text-primary/70 select-none">
          404
        </h1>
      </div>

      <p className="mt-8 text-grey max-w-md">
        Похоже, вы перешли по несуществующей ссылке или страница была удалена.
      </p>

      <Link
        href="/"
        className="mt-10 inline-block bg-primary px-6 py-3 rounded-full font-medium hover:bg-primary/80 transition"
      >
        Вернуться на главную
      </Link>

      <div className="mt-16 w-24 h-[2px] bg-primary/40 rounded-full" />
    </section>
  );
}
