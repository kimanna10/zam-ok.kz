export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-primary/40 animate-[spin_1.5s_linear_infinite_reverse]"></div>
      </div>

      {/* <p className="mt-6 text-lg font-medium tracking-wide text-white/90 animate-pulse">
        Загрузка...
      </p> */}
    </div>
  );
}
