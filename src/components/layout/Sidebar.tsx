import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  GettingStartedIcon,
  OverviewIcon,
  AccountsIcon,
  InvoiceIcon,
  BeneficiaryIcon,
  HelpCenterIcon,
  SettingsIcon,
  SidebarIconProps,
} from "../icons/SidebarIcons";

const iconClass = "h-6 w-6 text-gray-400";

type SidebarProps = {
  className?: string;
};

type Item = {
  path: string;
  label: string;
  active?: boolean;
  icon: React.ComponentType<SidebarIconProps>;
};

const items: Item[] = [
  {
    path: "/",
    label: "Getting Started",
    icon: GettingStartedIcon,
  },
  {
    path: "/overview",
    label: "Overview",
    icon: OverviewIcon,
  },
  {
    path: "/accounts",
    label: "Accounts",
    icon: AccountsIcon,
  },
  {
    path: "/",
    label: "Invoice",
    active: true,
    icon: InvoiceIcon,
  },
  {
    path: "/beneficiary",
    label: "Beneficiary Management",
    icon: BeneficiaryIcon,
  },
  {
    path: "/help",
    label: "Help Center",
    icon: HelpCenterIcon,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={clsx(
        "sticky top-0 h-screen w-[300px] border-r border-gray-200 bg-white/90 backdrop-blur font-neue",
        className
      )}
      aria-label="Primary"
    >
      <div className="p-4">
        <div className="mb-6 h-8 w-1 rounded-md bg-primary" aria-hidden />
        <nav className="space-y-3">
          {items.map((item, idx) =>
            (() => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center font-normal rounded-xl gap-2 px-4 py-3.5 text-sm hover:bg-gray-100",
                      isActive || item.active
                        ? "bg-gray-100 rounded-2xl bor text-text-soft_2"
                        : "text-text-soft"
                    )
                  }
                  aria-current={item.active ? "page" : undefined}
                >
                  <span className=" flex items-center justify-center">
                    <Icon className={iconClass} />
                  </span>
                  <span className="">{item.label}</span>
                </NavLink>
              );
            })()
          )}
        </nav>
      </div>
    </aside>
  );
}
