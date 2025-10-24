import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ArrowRightLeft,
  Repeat,
  Vault,
  Network,
  HelpCircle,
  Info,
} from "lucide-react";
import { WalletButton } from "./WalletButton";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Transaction", path: "/transaction", icon: ArrowRightLeft },
  { name: "Swap", path: "/swap", icon: Repeat },
  { name: "Stake", path: "/stake", icon: Vault },
  { name: "Cross-Chain", path: "/crosschain", icon: Network },
  { name: "Help", path: "/help", icon: HelpCircle },
  { name: "About", path: "/about", icon: Info },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DeFi Router
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <WalletButton />
      </div>
    </nav>
  );
};
