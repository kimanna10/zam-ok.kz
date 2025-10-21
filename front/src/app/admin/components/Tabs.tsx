"use client";

import { ReactNode, useState } from "react";

type Tab = { name: string; content: ReactNode };

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex border-b mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 -mb-px font-medium border-b-2 transition ${
              active === i
                ? "border-primary text-primary"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}
