import React from "react";
import { useAuth } from "../../auth/AuthContext";
import { Dropdown } from "../ui/Dropdown";

type TopbarProps = {
  onMenuClick?: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, logout } = useAuth();

  const displayName = user?.displayName || user?.email || "User";
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "U";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Failed to logout", e);
    }
  };

  return (
    <header className="container px-4  md:px-8 mx-auto sticky top-0 z-10  bg-transparent  backdrop-blur">
      <div className=" border-b-2  gap-3 flex items-center justify-between py-7">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={onMenuClick}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#373B47] shadow-card lg:hidden"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5H15M3 9H15M3 13H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <h1 className="uppercase text-3xl font-neue-medium font-semibold">
            INVOICE
          </h1>
        </div>
        <div className="relative ml-2 flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="h-16 w-16 rounded-full flex items-center justify-center bg-white "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M12 6.43994V9.76994"
                stroke="#373B47"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
                stroke="#373B47"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                opacity="0.4"
                d="M15.33 18.8199C15.33 20.6499 13.83 22.1499 12 22.1499C11.09 22.1499 10.25 21.7699 9.65004 21.1699C9.05004 20.5699 8.67004 19.7299 8.67004 18.8199"
                stroke="#373B47"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
          </button>
          <Dropdown
            align="right"
            buttonClass="bg-white h-16  !rounded-full  flex items-center"
            button={
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-main_blue-100 text-white">
                  {initials}
                </span>
                <span>
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.8077 4.8075L8.3377 1.2775C8.6277 0.9775 8.6277 0.5075 8.3377 0.2175C8.0477 -0.0725 7.5677 -0.0725 7.2777 0.2175L4.2777 3.2175L1.2777 0.2175C0.987701 -0.0725 0.507701 -0.0725 0.217701 0.2175C0.0782212 0.358638 0 0.54907 0 0.747501C0 0.945931 0.0782212 1.13636 0.217701 1.2775L3.7477 4.8075C3.8977 4.9575 4.0877 5.0275 4.2777 5.0275C4.4677 5.0275 4.6577 4.9575 4.8077 4.8075Z"
                      fill="#697598"
                    />
                  </svg>
                </span>
              </div>
            }
            items={[
              {
                id: "logout",
                label: "Log out",
                onSelect: handleLogout,
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
