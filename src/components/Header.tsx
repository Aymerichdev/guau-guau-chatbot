import logo from "@/assets/logo.png";
import { motion } from "framer-motion";

type Tab = "catalog" | "chat";

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: "catalog", label: "Catálogo", emoji: "🛍️" },
    { id: "chat", label: "PetBot", emoji: "🤖" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Guau Guau Pet Shop"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight text-foreground">
              Guau Guau
            </h1>
            <p className="text-xs text-muted-foreground">Pet Shop</p>
          </div>
        </div>

        <nav
          aria-label="Secciones principales"
          className="flex gap-1 rounded-full border border-border bg-card p-1 shadow-[var(--shadow-card)]"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5"
                aria-pressed={active}
              >
                {active && (
                  <motion.span
                    layoutId="active-tab-pill"
                    className="absolute inset-0 rounded-full bg-[var(--gradient-brand)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-1.5 ${
                    active ? "text-primary-foreground" : "text-foreground/70"
                  }`}
                >
                  <span aria-hidden>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
