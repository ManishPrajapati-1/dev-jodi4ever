// components/Sidebar.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, MessageSquare, Heart, Settings, Bell, Sliders } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/dashboard/home', icon: Home },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Activity', href: '/dashboard/activity', icon: Sliders },
  { name: 'Partner Preferences', href: '/dashboard/preferences', icon: Sliders },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Liked Users', href: '/dashboard/liked', icon: Heart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Matrimony</h2>
      <nav className="flex md:flex-col flex-wrap gap-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium
                ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
