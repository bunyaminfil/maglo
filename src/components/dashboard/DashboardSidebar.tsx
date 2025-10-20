"use client";

import Image from "next/image";
import Link from "next/link";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function DashboardSidebar({ isOpen, onClose, onLogout }: DashboardSidebarProps) {
  return (
    <aside className={`
      w-[250px] flex flex-col bg-[#FAFAFA] shadow-[0_0_10px_rgba(0,0,0,0.05)] py-8 px-6 h-screen
      fixed lg:relative z-30 lg:z-auto
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-7 h-7 bg-[#1B212D] rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="text-lg font-bold text-[#1B212D]">Maglo.</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-semibold rounded-md bg-[#C8EE44] text-[#1B212D] font-medium">
              <Image
                src="/icons/dashboard.svg"
                alt="Dashboard"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
              <Image
                src="/icons/transactions.svg"
                alt="Transactions"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              Transactions
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
              <Image
                src="/icons/invoices.svg"
                alt="Invoices"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              Invoices
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
              <Image
                src="/icons/wallets.svg"
                alt="Wallets"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              My Wallets
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
              <Image
                src="/icons/settings.svg"
                alt="Settings"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto pt-8">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md">
              <Image
                src="/icons/help.svg"
                alt="Help"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              Help
            </Link>
          </li>
          <li>
            <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 text-[14px] font-medium text-[#929EAE] hover:bg-gray-100 rounded-md cursor-pointer">
              <Image
                src="/icons/logout.svg"
                alt="Logout"
                width={20}
                height={20}
                className="text-[#1B212D]"
              />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

