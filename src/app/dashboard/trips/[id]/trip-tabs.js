"use client";

import { useState } from "react";

const tabs = [
  { key: "docs", label: "Docs" },
  { key: "health", label: "Health" },
  { key: "packing", label: "Packing" },
  { key: "budget", label: "Budget" },
  { key: "explore", label: "Explore" },
];

export default function TripTabs({
  docsContent,
  healthContent,
  packingContent,
  budgetContent,
  exploreContent,
}) {
  const [active, setActive] = useState("docs");

  const content = {
    docs: docsContent,
    health: healthContent,
    packing: packingContent,
    budget: budgetContent,
    explore: exploreContent,
  };

  return (
    <div>
      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-black/10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`-mb-px shrink-0 border-b-2 px-3 py-2 text-sm font-medium ${
              active === tab.key
                ? "border-black text-black"
                : "border-transparent text-black/50 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{content[active]}</div>
    </div>
  );
}
